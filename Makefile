

all: build server


build:
	$(foreach file, $(wildcard content/*.md), pandoc --from markdown-markdown_in_html_blocks+raw_html --standalone  $(file) -c picnic.min.css --template static/template.html -o public/$(basename $(notdir $(file:.md=))).html)
	

server:
	cd public && python3 -m http.server $(PORT)