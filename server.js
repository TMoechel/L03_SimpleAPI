var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var personRouterModule = require('./personRouter')

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

//register routers
app.use('/personList', personRouterModule);

var port = 3000;
app.listen(port);
console.log('node server is running on port 3000');

module.exports = app;