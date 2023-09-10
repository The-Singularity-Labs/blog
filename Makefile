
CURRENT_DIR := $(shell pwd)

all: build server


build:
	# $(foreach file, $(wildcard content/*.md), pandoc --from markdown-markdown_in_html_blocks+raw_html --standalone  $(file) -c picnic.min.css --template static/template.html -o public/$(basename $(notdir $(file:.md=))).html)
	rm -rf dist/*
	cd app && yarn build
	
dev: feed
	cd app && yarn run dev --host 127.0.0.1 --port 41119

feed: db
	rm -rf app/src/assets/db/feed_draft.atom
	@echo "Executing init SQL script..."
	sqlite3 app/src/assets/db/feed_draft.atom < schema/init.sql
	cd cmd/feed/ && go run main.go --db=$(CURRENT_DIR)/app/src/assets/db/cms.db --out=$(CURRENT_DIR)/app/src/assets/db/feed_draft.atom
	mv app/src/assets/db/feed_draft.atom app/src/assets/db/feed.atom

db:
	rm -rf app/src/assets/db/cms_draft.db
	@echo "Executing init SQL script..."
	sqlite3 app/src/assets/db/cms_draft.db < schema/init.sql
	cd cmd/load/ && go run -tags _ENABLE_FTS5=1 main.go --dir=$(CURRENT_DIR)/content --cms=$(CURRENT_DIR)/app/src/assets/db/cms_draft.db
	sqlite3 app/src/assets/db/cms_draft.db < schema/cleanup.sql
	rm -rf app/src/assets/db/cms.db
	mv app/src/assets/db/cms_draft.db app/src/assets/db/cms.db