// set up =============================================================
var express = require("express");
var app = express();
var hbs = require('hbs');
var api = require('./app/api.js');
var details = require('./app/details.js');

// configuration ======================================================
app.use(express.static(__dirname));
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

// routes =============================================================
require('./app/routes.js')(app, api, details);

// spin up server =====================================================
app.listen(process.env.PORT || 8080, null);
console.log('server running on port 8080');

