// Set up start/end/error handlers.

var startCount = 0,
    endCount = 0,
    errorCount = 0;

XHRJSON.onstart = function(xhr) {
    if (!(xhr instanceof XMLHttpRequest)) {
        throw new Error('Bad handler argument.');
    }
    startCount++;
};

XHRJSON.onend = function(xhr) {
    if (!(xhr instanceof XMLHttpRequest)) {
        throw new Error('Bad handler argument.');
    }
    endCount++;
};

XHRJSON.onerror = function(xhr) {
    if (!(xhr instanceof XMLHttpRequest)) {
        throw new Error('Bad handler argument.');
    }
    errorCount++;
};

describe('REST actions', function() {
    it('should make create new user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.post('/user', { name: 'John', weight: 75 }, function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, false);
            done();
        });
    });

    it('should retrieve the user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.get('/user/John', function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, false);
            assert.equal(result.data.name, 'John');
            assert.equal(result.data.weight, 75);
            done();
        });
    });

    it('should modify the user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.put('/user/John', { weight: 72 }, function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, false);
            done();
        });
    });

    it('should retrieve the modified user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.get('/user/John', function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, false);
            assert.equal(result.data.name, 'John');
            assert.equal(result.data.weight, 72);
            done();
        });
    });

    it('should delete the user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.del('/user/John', function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, false);
            done();
        });
    });

    it('should get no user', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.get('/user/John', function(err, result) {
            assert.ok(!err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec);
            assert.equal(result.error, true);
            done();
        });
    });
}); 

describe('Error handling', function() {
    it('should get error on invalid url', function(done) {
        var sc = startCount, nc = endCount, ec = errorCount;
        XHRJSON.get('/invalid', function(err) {
            assert.ok(err);
            assert.equal(startCount, sc + 1);
            assert.equal(endCount, nc + 1);
            assert.equal(errorCount, ec + 1);
            done();
        });
    });
});