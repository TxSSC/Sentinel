/**
 * Module dependencies
 */

var http = require('http'),
    express = require('express'),
    controllers = require('./controllers');

/**
 * Create the app
 */

var app = express();

/**
 * Simple cors middleware
 */

var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept, Origin, Referer, User-Agent, Content-Type');

  return req.method === 'OPTIONS' ? res.send(200) : next();
}


/**
 * General configuration
 */

app.configure(function(){
  app.set('port', process.env.SENTINEL_PORT || 3000);
  app.use(express.bodyParser());
  app.use(cors);
  app.use(app.router);
});

/**
 * Production specific configuration
 */

app.configure('production', function() {
  app.use(express.logger('short'));
});

/**
 * Development specific configuration
 */

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

/**
 * Add routes
 */

app.get('/', controllers.Servers.index);
app.get('/:name', controllers.Servers.get);

/**
 * Create a new http server and start listening
 */

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
