all: check test

check:
	jshint xhr-json.js tests/

test:
	mocha-phantomjs -R dot http://localhost:4444/

.PHONY: test check