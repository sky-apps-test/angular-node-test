var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    port = config.port || 8080,
    routes;

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(port);

module.exports.express = express;
module.exports.app = app;
routes = require('./routes');

console.log('Listening to port ' + port);
