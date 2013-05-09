/**
 * Module dependencies
 */

var request = require('supertest'),
    helpers = require('./helpers');

describe('Sentinel', function() {
  var app;

  before(function(done) {
    app = helpers.createApp();

    // Hack so we can poll servers before requests
    setTimeout(done, 500);
  });

  it('should return 200 status', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });

  it('should return true status for example servers', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        res.body.should.have.property("http://www.google.com", true);
        res.body.should.have.property("http://txssc.txstate.edu", true);

        return done(err);
      });
  });

});