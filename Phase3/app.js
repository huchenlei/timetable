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

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
nunjucks.configure(path.join(__dirname, "./views"), { autoescape: true, express: app });
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/courses', courses);
app.use('/users', users);

//GET /courses?courseCode=CSC     暂时用不到
app.get('/courses', function(req, res) {
  var keyword = req.query;
  console.log(keyword.courseCode);
  database.courseSchema.find({_id: new RegExp(keyword.courseCode, "i")}).populate({
    path: 'course',
  }).exec(function (err, courses) {
    return res.jsonp(courses);
  });
});

app.get("/", function(req, res) {
  res.render("index.html");
});

app.get("/signup", function(req, res) {
  res.render("signup.html");
});

app.get("/login", function(req, res) {
  res.render("login.html");
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

module.exports = app;
