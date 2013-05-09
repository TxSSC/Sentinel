/**
 * Module dependencies
 */

var express = require('express'),
    controllers = require('../controllers');

/**
 * Expose `helpers`
 */

var helpers = module.exports = exports;

/**
 * Returns a new app instance for testing
 */

helpers.createApp = function() {
  var app = express();

  app.use(express.bodyParser());
  app.use(app.router);
  app.get('/', controllers.Servers.index);
  app.get('/:name', controllers.Servers.get);

  return app;
};