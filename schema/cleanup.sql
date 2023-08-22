
INSERT INTO article_search (id, title, subtitle)
SELECT id, title, subtitle FROM articles;
vacuum;