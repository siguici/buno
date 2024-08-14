.PHONY: install check fix build publish deno

install: node_modules bun.lockb

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

verify: build
	deno task fix
	deno task check

publish: verify
	npm publish
	git push && git push --tags
