package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/hoenirvili/skapt"
	"github.com/hoenirvili/skapt/argument"
	"github.com/hoenirvili/skapt/flag"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type Article struct {
	ID          int       `db:"id" json:"id" yaml:"id"`
	Slug        string    `db:"slug" json:"slug" yaml:"slug"`
	Title       string    `db:"title" json:"title" yaml:"title"`
	Subtitle    string    `db:"subtitle" json:"subtitle" yaml:"subtitle"`
	HeroImgURL  string    `db:"hero_img_url" json:"hero_img_url" yaml:"hero_img_url"`
	PublishTime time.Time `db:"publish_date" json:"publish_date" yaml:"date"`
	UpdatedTime time.Time `db:"updated_at" json:"updated_at" yaml:"updated"`
	Tags        []string  `db:"tags" json:"tags" yaml:"tags"`
}

type Feed struct {
	XMLName xml.Name `xml:"feed"`
	NS      string   `xml:"xmlns,attr"`
	Title   string   `xml:"title"`
	Link    []Link   `xml:"link"`
	Updated string   `xml:"updated"`
	Entries []Entry  `xml:"entry"`
}

type Link struct {
	XMLName xml.Name `xml:"link"`
	Rel     string   `xml:"rel,attr"`
	Href    string   `xml:"href,attr"`
}

type Entry struct {
	XMLName   xml.Name   `xml:"entry"`
	ID        string     `xml:"id"`
	Title     string     `xml:"title"`
	Updated   string     `xml:"updated"`
	Published string     `xml:"published"`
	Link      []Link     `xml:"link"`
	Summary   Summary    `xml:"summary"`
	Category  []Category `xml:"category"`
}

type Summary struct {
	XMLName xml.Name `xml:"summary"`
	Value   string   `xml:",chardata"`
}

type Category struct {
	XMLName xml.Name `xml:"category"`
	Term    string   `xml:"term,attr"`
}

func main() {
	app := skapt.Application{
		Name:        "Load",
		Description: "Load content into cms",
		Version:     "1.0.0",
		Handler: func(ctx *skapt.Context) error {
			dbPath := ctx.String("db")
			outPath := ctx.String("out")
			db, err := sqlx.Connect("sqlite3", dbPath)
			if err != nil {
				return fmt.Errorf("error opening SQLite Database: %w", err)
			}
			defer db.Close()

			articles := []Article{}
			err = db.Select(&articles, `SELECT id, slug, title, subtitle, hero_img_url, published_date as publish_date, updated_at FROM articles LIMIT 20;`)
			if err != nil {
				return fmt.Errorf("error getting articles: %w", err)
			}

			feed, err := generateAtomFeed(articles)
			if err != nil {
				return fmt.Errorf("error generating atom feed: %w", err)
			}

			err = ioutil.WriteFile(outPath, feed, 0644)
			if err != nil {
				return fmt.Errorf("error writing feed: %w", err)
			}

			return nil
		},
		Flags: flag.Flags{{
			Short: "d", Long: "db",
			Description: "Filepath of Sqlite DB containing CMS",
			Type:        argument.String,
			Required:    true,
		}, {
			Short: "o", Long: "out",
			Description: "Filepath determing where to write atom feed xml.",
			Type:        argument.String,
			Required:    true,
		}},
	}
	app.Exec(os.Args)

}

func generateAtomFeed(articles []Article) ([]byte, error) {
	feed := Feed{
		NS:    "http://www.w3.org/2005/Atom",
		Title: "Singularity Labs",
		Link: []Link{
			{Rel: "self", Href: ""},
		},
		Updated: time.Now().Format(time.RFC3339),
	}

	for _, article := range articles {
		entry := Entry{
			ID:        fmt.Sprintf("#%s", article.Slug),
			Title:     article.Title,
			Updated:   article.UpdatedTime.Format(time.RFC3339),
			Published: article.PublishTime.Format(time.RFC3339),
			Link: []Link{
				{Rel: "alternate", Href: fmt.Sprintf("#article?slug=%s", article.Slug)},
			},
			Summary: Summary{Value: article.Subtitle},
		}
		feed.Entries = append(feed.Entries, entry)
	}

	output, err := xml.MarshalIndent(feed, "", "  ")
	if err != nil {
		return nil, err
	}

	return output, nil
}
