TS:=$(filter-out src/tests/%, $(shell find src/ -type f -name "*.ts"))
JS:=$(TS:src/%.ts=src/%.js)

all: gen

gen: src/index.html $(TS) src/html.js
	npx parcel build src/index.html --dist-dir public --public-url $(PWD)/public

test: $(TS)
	@echo "Tests"
	npx jest --verbose

clean:
	@echo "Nettoyage"
	rm -rf public/*
	rm -rf $(filter-out src/html.js %.test.js, $(shell find src/ -type f -name "*.js")) $(shell find src/ -type f -name "*.js.map")
	rm -rf .parcel-cache

install_packages:
	npm install --save-dev parcel typescript jest canvas ts-jest ts-node @types/jest

run:
	npx ts-node src/canvas.ts

.PHONY: all gen test clean

$(DEBUG).SILENT:
