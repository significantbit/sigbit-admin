
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {

  // Toggle between serving public/index.html
  // and sending a text 'Ola Mundo!' to see
  // nodemon restarting the server upon edit

  res.render('index.ejs');
//  res.send('Ola Mundo!');

});

app.get('/buttons', function(req, res) {
  res.render('buttons.ejs');
});
app.get('/colors', function(req, res) {
  res.render('colors.ejs');
});
app.get('/pageheader', function(req, res) {
  res.render('pageheader.ejs');
});
app.get('/imageupload', function(req, res) {
  res.render('imageupload.ejs');
});
app.get('/sortdrag', function(req, res) {
  res.render('sortdrag.ejs');
});
app.get('/forms', function(req, res) {
  res.render('forms.ejs');
});
app.get('/toggles', function(req, res) {
  res.render('toggles.ejs');
});


app.get('/devise/login', function(req, res) {
  res.render('login.ejs');
});
app.get('/devise/forgot', function(req, res) {
  res.render('forgot.ejs');
});



app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/views/devise']);
app.use(express.static('public'));

server.listen(3200, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
