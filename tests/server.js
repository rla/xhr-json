var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// Simple REST server.

var users = [];

app.post('/user', function(req, res) {
    users[req.body.name] = req.body;
    res.send({ error: false });
});

app.get('/user/:name', function(req, res) {
    var user = users[req.params.name];
    if (user) {
        res.send({ error: false, data: user });
    } else {
        res.send({ error: true });
    }
});

app.put('/user/:name', function(req, res) {
    var user = users[req.params.name];
    if (user) {
        res.send({ error: false });
        user.weight = req.body.weight;
    } else {
        res.send({ error: true });
    }
});

app.del('/user/:name', function(req, res) {
    var user = users[req.params.name];
    if (user) {
        delete users[req.params.name];
        res.send({ error: false });
    } else {
        res.send({ error: true });
    }
});

// XMLJSON file

app.get('/xhr-json.js', function(req, res) {
    res.sendfile('xhr-json.js', { root: __dirname + '/..' });
});

// Mocha/Chai files

var mochaDir = path.dirname(require.resolve('mocha'));
var chaiDir = path.dirname(require.resolve('chai'));

app.get('/mocha.css', function(req, res) {
    res.sendfile('mocha.css', { root: mochaDir });
});

app.get('/mocha.js', function(req, res) {
    res.sendfile('mocha.js', { root: mochaDir });
});

app.get('/chai.js', function(req, res) {
    res.sendfile('chai.js', { root: chaiDir });
});

http.createServer(app).listen(4444, function() {
    console.log('Express server listening.');
});