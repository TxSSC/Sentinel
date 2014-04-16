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
      config = JSON.parse(f),
      keys = Object.keys(config.servers),
      len = keys.length;

  function poll() {
    var i = 0;

    var fetch = function(key) {
      var server = config.servers[key];

      http.get(server.url, function(res) {
        servers[key] = res.statusCode === 200;
        if(i < len) next();
      }).on('error', function() {
        servers[key] = false;
      });
    };

    var next = function() {
      return fetch(keys[i++]);
    };

    setTimeout(poll, config.interval || 300000);
    return next();
  }

  // Start polling
  poll();

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
