var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname));
app.use(express.static('browser'));
app.use('/api', routes);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res, next) {
  res.sendfile('./browser/index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
