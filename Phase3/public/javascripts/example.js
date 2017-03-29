var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Course = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  br: Number
});

var courseSection = new Schema({
  cid: {
    type: Number,
    required: true,
    unique: true
  },
  courseCode: {
    type: String
    required: true
  },
  sectionCode: {
    type: String
    required: true
  },
  semester: String;
  instructor: String;
  location: String;
});

var courseTime = new Schema({
  cid: {
    type: Number,
    required: true
  },
  time: String,
  type: String
});

var User = new Schema({
  uid: {
    type: String
    required: true,
    unique: true
  },
  userName: String,
  passWord: String,
  fullName: String,
  emailAdress: String
});

var Preference = new Schema({
  uid: {
    type: String
    required: true
  },
  type: {
    type: String
    required: true
  },
  value: {
    type: String
    required: true
  }
});

var userCourse = new Schema({
  uid: {
    type: String
    required: true
  },
  cid: {
    type: String
    required: true
  }
})
mongoose.connect('mongodb://localhost/timetable');
module.exports = {
    Course: Course,
    courseSection: courseSection,
    courseTime: courseTime,
    User: User,
    Preference: Preference,
    userCourse: userCourse
};