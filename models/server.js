/**
 * Module dependencies
 */

var fs = require('fs'),
    http = require('http'),
    path = require('path');

/**
 * Main Model logic
 */

function Server() {
  var servers = {},
      f = fs.readFileSync(path.join(__dirname, '../config.json')),
      config = JSON.parse(f);

  (function poll(servers, config) {
    var i = 0,
        len = config.servers.length;

    setTimeout(poll.bind(null, servers, config), config.interval || 300000);

    var fetch = function(server) {
      http.get(server, function(res) {
        servers[server] = res.statusCode === 200;
        if(i < len) next();
      }).on('error', function() {
        servers[server] = false;
      });
    };

    var next = function() {
      return fetch(config.servers[i++]);
    };

    return next();
  })(servers, config);

  return {
    all: function() {
      return servers;
    },
    get: function(server) {
      return servers[server];
    }
  };
}

/**
 * Expose `Server`
 */

module.exports = Server();
