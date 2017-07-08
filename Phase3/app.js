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
  }
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

app.get("/admin", function(req, res) {
  res.render("admin2.html");
});

function populateCourseInfo(req, callback) {
  var course_info = [];
  database.courseSchema
    .find({
      code: new RegExp(req.courseCode, 'i'),
      campus: "UTSG",
      term: new RegExp("2017 Summer", 'i')
    })
    .exec(function(err, courses){
      console.log("courses from database")
      console.log(courses);
      const result = [];
      for (var i = 0; i < courses.length; i++) {
        sections = courses[i].meeting_sections;
        courseCode = courses[i].code.substr(0, 6);
        console.log("adding");
        console.log(courseCode);
        for (j = 0; j < sections.length; j++) {
          sections[j] = sections[j].toObject();
          sections[j].courseCode = courseCode;
        }
        console.log(sections);
        result.push(sections);
      }
      callback(result);
    });
}
function find_all_sections(user, callback) {
  var results = [];
  var counter = 0;
  for (var i = user.courses.length - 1; i >= 0; i--) {
        var section = {
          courseCode: user.courses[i],
        }
        populateCourseInfo(section, function(result) {
          results = results.concat(result);
          counter++;
          if (counter == user.courses.length) {
            callback(results);
          }
        });
      }
}

var split_list = require('./routes/split_list');
var compute_valid_solutions = require('./routes/smart');
function smart(req, res) {
  database.userSchema
    .findOne({_id: req.session.username})
    .populate('preferences')
    .exec(function(err, user) {
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
        output = output.concat(results);
        split_list(output, function(splited) {
          
          compute_valid_solutions(splited, function(solutions) {
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
