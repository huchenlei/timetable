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


//find by course level, br, course title
app.get('/courses', function(req, res) {
  var keyword = req.query;
  if (req.query._id) {
    var code = req.query._id;
    console.log(code);
  }
  console.log(keyword);
  database.courseSchema.find(keyword)
  .sort('_id')
  .populate({
    path: 'sections',
    populate: {
      path: 'timeslots'
    }
  }).exec(function (err, courses) {
    res.json(courses);
  });
});

app.get("/", function(req, res) {
  res.render("index.html");
});

app.get("/signup", function(req, res) {
  res.render("signup2.html");
});

app.get("/login", function(req, res) {
  res.render("login.html");
});

function populateCourseInfo(req, callback) {
  var course_info = [];
  database.courseSchema
    .findOne({
      _id: req.courseCode
    })
    .populate({
      path: 'sections',
      match: {semester: req.semester},
      populate: {
        path: 'timeslots'
      }
    })
    .exec(function(err, course){
      var result = course.sections;
      for (var i = result.length - 1; i >= 0; i--) {
        result[i].title = course.title;
        result[i].br = course.br;
        result[i].description = course.description;
      }
      callback(result);
    });
}
function find_all_sections(user, callback) {
  var results = [];
  var counter = 0;
  for (var i = user.courses.length - 1; i >= 0; i--) {
        var section = {
          courseCode: user.courses[i].courseCode,
          semester: user.courses[i].semester
        }
        populateCourseInfo(section, function(result) {
          results.push(result);
          counter++;
          console.log("counter " + counter);
          if (counter == user.courses.length) {
            callback(results);
          }
        });
      }
}

var preference_sort = require('./routes/preference');
var compute_valid_solutions = require('./routes/smart');
function smart(req, res) {
  database.userSchema
    .findOne({_id: req.session.username})
    .populate('preferences')
    .populate({
      path: 'courses',
      populate: {
        path: 'timeslots'
      }
    })
    .exec(function(err, user) {
      console.log(user);
      if (err | !user) {
        console.log("should not happen");
        return res.sendStatus(400);
      }
      var preferences = user.preferences;
      
      console.log("preferences");
      console.log(preferences);
      find_all_sections(user, function(results) {
        var output = [];
        output.push(preferences);
        for (var i = results.length - 1; i >= 0; i--) {
          output.push(results[i]);
        }
        //return res.json(1);
        console.log(1);
        console.log(res);
        preference_sort(output, function(sorted) {
          console.log("final");
          console.log(sorted);
          compute_valid_solutions(sorted, function(solutions) {
            return res.json(solutions);
          });
        });
      });
    });
}
app.get('/smart', smart);
app.listen(3000, function () {
  console.log('listening on port 3000!');
});

module.exports = app;
