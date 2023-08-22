
CURRENT_DIR := $(shell pwd)

all: build server


build:
	# $(foreach file, $(wildcard content/*.md), pandoc --from markdown-markdown_in_html_blocks+raw_html --standalone  $(file) -c picnic.min.css --template static/template.html -o public/$(basename $(notdir $(file:.md=))).html)
	rm dist/*
	cd app && yarn build
dev:
	cd app && yarn run dev --host 127.0.0.1 --port 41119

db:
	rm -rf app/src/assets/db/cms_draft.db
	@echo "Executing init SQL script..."
	sqlite3 app/src/assets/db/cms_draft.db < schema/init.sql
	cd cmd/load/ && go run -tags _ENABLE_FTS5=1 main.go --dir=$(CURRENT_DIR)/content --cms=$(CURRENT_DIR)/app/src/assets/db/cms_draft.db
	sqlite3 app/src/assets/db/cms_draft.db < schema/cleanup.sql
	rm -rf app/src/assets/db/cms.db
	mv app/src/assets/db/cms_draft.db app/src/assets/db/cms.db