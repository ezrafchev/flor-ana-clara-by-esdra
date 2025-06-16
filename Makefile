# Makefile
build:
	npm install
	npm run build

push:
	git init
	git remote add origin https://github.com/ezrafchev/flor-ana-clara-by-esdra.git
	git add .
	git commit -m "✨ Projeto floral premium"
	git branch -M main
	git push -u origin main

deploy:
	make build && make push
