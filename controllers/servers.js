/**
 * Module dependencies
 */

var Server = require('../models').Server;

/**
 * Expose `Servers`
 */

var Servers = module.exports = exports;

/**
 * Get /
 */

Servers.index = function(req, res) {
  return res.json(200, Server.all());
};

/**
 * Get /:server
 */

Servers.get = function(req, res) {
  var server = Server.get(req.params.name);

  if(!server) return res.json(404);
  return res.json(200, server);
};