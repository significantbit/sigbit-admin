
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

app.get('/tablebuttons', function(req, res) {
  res.render('tablebuttons.ejs');
});
app.get('/colors', function(req, res) {
  res.render('colors.ejs');
});
app.get('/pageheader', function(req, res) {
  res.render('pageheader.ejs');
});


app.set('view engine', 'ejs');
app.use(express.static('public'));

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
