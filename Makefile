.PHONY: install client server run pip-install scraper

install:
	yarn install

client: install
	yarn workspace client watch

server: install
	yarn workspace server watch

run: install
	yarn start

pip-install:
	pip install -r scraper/requirements.txt

scraper: pip-install
	python scraper/main.py
