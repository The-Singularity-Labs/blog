package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hoenirvili/skapt"
	"github.com/hoenirvili/skapt/argument"
	"github.com/hoenirvili/skapt/flag"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
	"gopkg.in/yaml.v2"
)

type Article struct {
	ID          int       `db:"id" json:"id" yaml:"id"`
	Slug        string    `db:"slug" json:"slug" yaml:"slug"`
	Author      string    `db:"author" json:"author" yaml:"author"`
	Title       string    `db:"title" json:"title" yaml:"title"`
	Subtitle    string    `db:"subtitle" json:"subtitle" yaml:"subtitle"`
	HeroImgURL  string    `db:"hero_img_url" json:"hero_img_url" yaml:"hero_img_url"`
	PublishTime time.Time `db:"publish_date" json:"publish_date" yaml:"published"`
	UpdatedTime time.Time `db:"updated_at" json:"updated_at" yaml:"updated"`
	Content     string    `db:"content" json:"content" yaml:"content"`
	Tags        []string  `db:"tags" json:"tags" yaml:"tags"`
}

func main() {
	app := skapt.Application{
		Name:        "Load",
		Description: "Load content into cms",
		Version:     "1.0.0",
		Handler: func(ctx *skapt.Context) error {
			dirPath := ctx.String("dir")
			dbPath := ctx.String("cms")
			db, err := sqlx.Connect("sqlite3", dbPath)
			if err != nil {
				return fmt.Errorf("error opening SQLite Database: %w", err)
			}
			defer db.Close()

			articles, err := contentDirToArticles(dirPath)
			if err != nil {
				return fmt.Errorf("error loading articles: %w", err)
			}

			tx := db.MustBegin()
			for _, article := range articles {
				err = loadArticle(tx, article)
				if err != nil {
					return fmt.Errorf("error loading articles: %w", err)
				}
			}

			err = tx.Commit()
			if err != nil {
				return fmt.Errorf("Error committing transaction")
			}

			return nil
		},
		Flags: flag.Flags{{
			Short: "d", Long: "dir",
			Description: "Directory pointing to markdown files",
			Type:        argument.String,
			Required:    true,
		}, {
			Short: "c", Long: "cms",
			Description: "Filepath to SQLite database of CMS",
			Type:        argument.String,
			Required:    true,
		}},
	}
	app.Exec(os.Args)

}

func contentDirToArticles(dirPath string) (articles []Article, retErr error) {
	files, err := ioutil.ReadDir(dirPath)
	if err != nil {
		retErr = fmt.Errorf("error reading directory: %w", err)
		return articles, retErr
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		filename := file.Name()
		if strings.HasSuffix(filename, ".md") {
			fullPath := filepath.Join(dirPath, filename)
			article, err := readArticleFromFile(fullPath)
			if err != nil {
				retErr = fmt.Errorf("error parsing markdown file: %w", err)
				return articles, retErr
			}
			articles = append(articles, article)
		}
	}

	return articles, retErr
}

func readArticleFromFile(filePath string) (Article, error) {
	var article Article

	fileContent, err := ioutil.ReadFile(filePath)
	if err != nil {
		return article, err
	}

	parts := strings.SplitN(string(fileContent), "---", 3)
	if len(parts) < 3 {
		return article, fmt.Errorf("invalid file format: %s", filePath)
	}

	yamlFrontMatter := parts[1]
	content := strings.TrimSpace(parts[2])

	err = yaml.Unmarshal([]byte(yamlFrontMatter), &article)
	if err != nil {
		return article, err
	}

	if article.PublishTime.After(article.UpdatedTime) {
		article.UpdatedTime = article.PublishTime
	}

	article.Content = content
	return article, nil
}

func loadArticle(tx *sqlx.Tx, article Article) error {
	tagsJSON, err := json.Marshal(article.Tags)
	if err != nil {
		return fmt.Errorf("error converting tags to json string: %w", err)
	}

	_, err = tx.NamedExec(`INSERT INTO articles (title, subtitle, author, slug, hero_img_url, published_date, updated_at, tags) VALUES (:title, :subtitle, :author, :slug, :hero_img_url, :publish_date, :updated_at, :tags)`, struct {
		Article
		Tags string `db:"tags"`
	}{
		Article: article,
		Tags:    string(tagsJSON),
	})
	if err != nil {
		return fmt.Errorf("error inserting article metadata: %w", err)
	}

	err = tx.Get(&article, `SELECT last_insert_rowid() as id`)
	if err != nil {
		return fmt.Errorf("error getting article id: %w", err)
	}

	_, err = tx.NamedExec(`INSERT INTO article_content (article_id, content_md) VALUES (:id, :content)`, article)
	if err != nil {
		return fmt.Errorf("error inserting article content: %w", err)
	}

	return nil
}
