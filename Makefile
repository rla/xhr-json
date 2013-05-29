all: check test

check:
	jshint xhr-json.js tests/

test:
	mocha-phantomjs --no-color --reporter tap http://localhost:4444/

serve-and-test:
	tests/run.sh

ci: check serve-and-test

.PHONY: test serve-and-test check ci