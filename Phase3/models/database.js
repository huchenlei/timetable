// set up.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

// set up end.

var course = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  code: String,
  name: String,
  description: String,
  division: String,
  department: String,
  prerequisites: String,
  exclusions: String,
  level: Number,
  campus: String,
  term: String,
  breadths: [Number],
  meeting_sections: [{
    code: {
      type: String
    },
    instructors: [String],
    times: [{
      day: String,
      start: Number,
      end: Number,
      duration: Number,
      location: String
    }],
    size: Number,
    enrolment: 0
  }]
});

var courseSection = new Schema({
  courseCode: {
    type: String,
    ref: 'courses',
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  type: String,
  sectionCode: {
    type: String,
    required: true
  },
  instructor: String,
  timeslots: [{
    type: ObjectId,
    ref: 'course_times'
  }],
  score: {
    type: Number,
    default: 0
  }
});
courseSection.index({courseCode: 1, sectionCode: 1, type: 1, semester: 1}, {unique: true});

var courseTime = new Schema({
  cid: {
    type: ObjectId,
    ref: 'course_sections',
    required: true
  },
  weekday: String,
  start: Number,
  end: Number,
  location: String
});
courseTime.index({cid: 1, weekday: 1, start: 1, location: 1}, {unique: true});

var user = new Schema({
  _id: { // username of this user
    type: String,
    required: true,
    unique: true
  },
  passWord: String,
  fullName: String,
  emailAddress: String,
  admin: {
    type: Boolean,
    default: false
  },
  preferences: [{
    type: ObjectId,
    ref: 'preferences'
  }],
  courses: [String]
});

var preference = new Schema({
  uid: {
    type: String,
    ref: 'users',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});


preference.index({uid: 1, type: 1, value: 1}, {unique: true});


// middle wares for casacade deletion.
preference.pre('save', function(next) {
  var preId = this._id;
  userSchema.findOne({_id: this.uid}, function(err, result) {
    if (err || !result) {
      var error = new Error("error: finding user in post function adding preference");
      next(error);
    } else {
      result.preferences.push(preId);
      result.save(function(err) {
        if (err) {
          var error = new Error("error: updating user preferences");
          next(error);
        } else {
          next();
        }
      });
    }
  });
});

// remove all user preferences before removing user
user.pre('remove', function(next) {
  var uid = this._id;
  preferenceSchema.remove({uid: uid}, function(err) {
    next(err);
  });
});

// remove all timeslot before removing a courseSection
courseSection.pre('remove', function(next) {
  var cid = this._id;
  courseTimeSchema.remove({cid: cid}, function(err) {
    next(err);
  });
});

// remove courseSection from course section list before removing a courseSection
courseSection.pre('remove', function(next) {
  var section = this._id;
  courseSchema.findOne({_id: this.courseCode}, function(err, course) {
    if (err) {
      next(err);
    }
    else {
      if (!course) {
        var error = new Error("This should not happen.");
        next(error);
      } else {
        var index = course.sections.indexOf(section);
        if (index > -1) {
          course.sections.splice(index, 1);
        }
        course.save(function(err) {
          next(err);
        });
      }
    }
  });
});

// remove courseSection from user section list before removing a courseSection
courseSection.pre('remove', function(next) {
  var section = this._id;
  userSchema.findOne({courses: section}, function(err, users) {
    if (err) {
      next(err);
    }
    else {
      if (users.length == 0) {
        next();
      } else {
        for (var i in users) {
          var user = users[i];
          var index = user.courses.indexOf(section);
          if (index > -1) {
            user.courses.splice(index, 1);
            user.save(function(err) {
              if (err) next(err);
            });
          }
        }
        next();
      }
    }
  });
});

// remove timeslot from courseSection list before removing a timeslot
courseTime.pre('remove', function(next) {
  var timeslot = this._id;
  courseSectionSchema.findOne({_id: this.cid}, function(err, section) {
    if (err) {
      next(err);
    }
    else {
      if (!section) {
        var error = new Error("This should not happen.");
        next(error);
      } else {
        var index = section.timeslots.indexOf(timeslot);
        if (index > -1) {
          section.timeslots.splice(index, 1);
        }
        section.save(function(err) {
          next(err);
        });
      }
    }
  });
});

// remove all courseSections before removing a course
course.pre('remove', function(next) {
  var courseCode = this._id;
  courseSectionSchema.remove({courseCode: courseCode}, function(err) {
    next(err);
  });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dev:devdev@ds153732.mlab.com:53732/smart-timetable');
var courseSchema = mongoose.model('courses', course);
var courseSectionSchema = mongoose.model('course_sections', courseSection);
var courseTimeSchema = mongoose.model('course_times', courseTime);
var userSchema = mongoose.model('users', user);
var preferenceSchema = mongoose.model('preferences', preference);

module.exports = {
  courseSchema: courseSchema,
  courseSectionSchema: courseSectionSchema,
  courseTimeSchema: courseTimeSchema,
  preferenceSchema: preferenceSchema,
  userSchema: userSchema,
};
