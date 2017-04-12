GS_BUCKET := census.headmates.net
GS_LOG_BUCKET = census-headmates-net-logs

all: build

build:
	webpack --config webpack-production.config.js --progress --colors -p && cat index.html > build/index.html

install: build
	gsutil cp -a public-read index.html gs://$(GS_BUCKET)/2016/index.html
	gsutil cp -a public-read build/app.js gs://$(GS_BUCKET)/2016/app.js

run:
	webpack-dev-server --config webpack-dev-server.config.js --progress --inline --colors --watch

.PHONY: build run
