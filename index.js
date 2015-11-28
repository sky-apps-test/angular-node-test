var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    env = process.env.NODE_ENV || "development",
    config = require('./config/config')[env],
    port = config.PORT || 8080,
    routes;

mongoose.connect(config.database);

app.set('jwtSecret', config.JWTSecret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(port);

module.exports.express = express;
module.exports.app = app;
routes = require('./routes');

console.log('Listening ' + port);
