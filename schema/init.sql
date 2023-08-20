-- Create the Categories table
CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- Create the Articles table
CREATE TABLE articles (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    hero_image_b64 TEXT,
    slug TEXT NOT NULL,
    content_md TEXT NOT NULL,
    metadata JSON,
    category_id INTEGER NOT NULL,
    published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE article_content (
    article_id INTEGER PRIMARY KEY,
    content_md TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
);