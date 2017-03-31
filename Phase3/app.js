var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
// var routes = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/course');
var database = require('./models/database');
var session = require('express-session');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'I am actually a potato', resave: false, saveUninitialized: false }));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(cookieParser());
app.set('views', path.join(__dirname, './views'));
nunjucks.configure(path.join(__dirname, "views"), { autoescape: true, express: app });
app.use(express.static(path.join(__dirname, "./public")));

//app.use('/', routes);
app.use('/courses', courses);
require('./routes/users')(database, app);

app.get("/", function(req, res) {
  res.render("index.html");
});

app.get("/signup", function(req, res) {
  res.render("signup.html");
});

app.get("/login", function(req, res) {
  res.render("login.html");
});

app.listen(4000, function () {
  console.log('listening on port 4000!');
});

module.exports = app;
