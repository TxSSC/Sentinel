/**
 * Module dependencies
 */

var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    https = require('https'),
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
      var server = config.servers[key],
          options = url.parse(server.url),
          module = options.protocol === "https:" ? https : http;

      module.get(options, function(res) {
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
