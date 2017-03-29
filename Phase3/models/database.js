// set up.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

// set up end.

var course = new Schema({
  _id: { // format is "CSC108"
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  br: Number,
  sections: [{
    type: ObjectId,
    ref: 'course_sections'
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
  emailAdress: String,
  admin: {
    type: Boolean,
    default: false
  },
  preferences: [{
    type: ObjectId,
    ref: 'preferences'
  }],
  courses: [{
    type: ObjectId,
    ref: 'course_sections'
  }]
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

mongoose.connect('mongodb://localhost/timetable');
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