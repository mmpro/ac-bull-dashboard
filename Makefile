lint-check:
	./node_modules/.bin/eslint src/*.tsx

lint-fix:
	./node_modules/.bin/eslint lib/*.tsx --fix

build:
	yarn run build

commit:
	@node ./node_modules/ac-semantic-release/lib/commit.js

release:
	@node ./node_modules/ac-semantic-release/lib/release.js