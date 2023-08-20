

all: build server


build:
	$(foreach file, $(wildcard content/*.md), pandoc --from markdown-markdown_in_html_blocks+raw_html --standalone  $(file) -c picnic.min.css --template static/template.html -o public/$(basename $(notdir $(file:.md=))).html)

dev:
	cd app && yarn run dev --host 127.0.0.1 --port 41119

setup:
