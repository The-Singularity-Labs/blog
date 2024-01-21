-- Create the Articles table
CREATE TABLE articles (
    id INTEGER PRIMARY KEY,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    slug TEXT NOT NULL,
    hero_img_url TEXT,
    tags JSON NOT NULL, -- Storing tags as JSON
    metadata JSON,
    published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_articles_slug
ON articles (slug);

CREATE INDEX idx_articles_published_date
ON articles (published_date);

CREATE INDEX idx_articles_updated_date
ON articles (updated_at);

CREATE TABLE article_content (
    article_id INTEGER PRIMARY KEY,
    content_md TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
);

CREATE VIRTUAL TABLE article_search USING fts5(id, title, subtitle);

pragma journal_mode = delete;
pragma page_size = 1024;
