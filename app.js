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
// app.use(cookieParser());
// app.set('views', path.join(__dirname, './views'));
// nunjucks.configure(path.join(__dirname, "views"), { autoescape: true, express: app });
// app.use(express.static(path.join(__dirname, "./public")));

app.use(express.static(path.join(__dirname, '/dist')));

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
      campus: "UTSG"
    })
    .exec(function(err, courses){
      const result = [];
      for (var i = 0; i < courses.length; i++) {
        sections = courses[i].meeting_sections;
        var term = courses[i].term;
        var courseCode = courses[i].code.substr(0, 6);
        var name = courses[i].name;
        for (j = 0; j < sections.length; j++) {
          sections[j] = sections[j].toObject();
          sections[j].courseCode = courseCode;
          sections[j].term = term;
          sections[j].name = name;
        }
        result.push(sections);
      }
      callback(result);
    });
}
function find_all_sections(courses, callback) {
  var results = [];
  var counter = 0;
  for (var i = courses.length - 1; i >= 0; i--) {
        var section = {
          courseCode: courses[i]
        }
        populateCourseInfo(section, function(result) {
          results = results.concat(result);
          counter++;
          if (counter == courses.length) {
            callback(results);
          }
        });
      }
}

var split_list = require('./routes/split_list');
var compute_valid_solutions = require('./routes/smart');

function smart(req, res) {
  const courselist = JSON.parse(req.body.courselist);
  const preferences_raw = JSON.parse(req.body.preferences);
  const term = req.body.term;
  const preferences = [];
  for (var type in preferences_raw) {
    preferences.push({
      type: type,
      value: preferences_raw[type]
    });
  }
  console.log(preferences);
  console.log(courselist);
  find_all_sections(courselist, function(results) {
      var output = [];
      output.push(preferences);
      output = output.concat(results);
      split_list(output, term, function(list) {
        compute_valid_solutions(list, term, function(solutions) {
          return res.json({
            solutions: JSON.stringify(solutions),
            courses: JSON.stringify(list[1])
          });
        });
      });
    });

}
app.post('/smart', smart);
app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
});

module.exports = app;
