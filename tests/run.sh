#!/usr/bin/env bash

set -e
node tests/server.js &
pid=$!
set +e
sleep 2
mocha-phantomjs --no-color --reporter tap http://localhost:4444/
kill $pid
