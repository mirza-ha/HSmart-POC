
var Keycloak = require('keycloak-connect');
var hogan = require('hogan-express');
var express = require('express');
var session = require('express-session');

var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.set('view engine', 'html');
app.set('views', require('path').join(__dirname, '/view'));
app.engine('html', hogan);


app.get('/', function (req, res) {
  res.render('index');
});

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/login', keycloak.protect(), function (req, res) {
  res.render('index', {
    result: JSON.stringify(JSON.parse(req.session['keycloak-token']), null, 4),
    event: '1. Authentication\n2. Login'
  });
});

app.get('/data', keycloak.protect(), (req,res) => { res.end("ABC") })
