.PHONY: install check fix build

install: node_modules bun.lock

node_modules: package.json
	bun install

bun.lockb: package.json
	bun update

check: install
	bun check

fix: install
	bun fix

build: check
	bun run build

.PHONY: jsr npm dist publish release

jsr: build

npm: jsr
	deno task build

dist: jsr npm
	deno task fix
	deno task check

publish: dist
	bunx pkg-pr-new publish

release: dist
	bun release
