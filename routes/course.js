var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* A course should consists of departmentID, courseNum, br (breadthRequirement),
 * timeslot, and courseDescription
 */

function getNewCourse(req, res) {
  var code = req.params.code;
  var semester = req.params.semester;
  database.courseSchema.find({
    code: new RegExp(code, 'i'),
    term: {
      $in: ["2017 Fall", "2018 Winter"]
    },
    campus: "UTSG"
  },
    function(err, courses){
      if (courses.length == 0) {
        return res.sendStatus(404);
      }
      else {
        return res.json(courses);
      }
    });
}

function getNewCourseMin(req, res) {
  var code = req.params.code;
  database.courseSchema.find({
    code: new RegExp(code, 'i'),
    campus: "UTSG",
    term: {
      $in: ["2017 Fall", "2018 Winter"]
    }
  },
  {
    code: 1, name: 1, _id:0
  },
    function(err, courses){
      if (courses.length == 0) {
        // return res.sendStatus(404);
        return res.status(404).send("Course not found.")
      }
      else {
        return res.json(courses);
      }
    }).limit(7);
}

//Create a course
function insertCourse(req, res) {
  var response = {
      _id: req.body.courseCode,
      title: req.body.title,
      description: req.body.description,
      br: req.body.br,
      courseLevel: req.body.courseLevel
  };
  database.courseSchema.count({_id: req.body.courseCode},
    function(err, count){
      if (count > 0) {
        return res.sendStatus(403);
      }
      else {
        new database.courseSchema(response).save(function (err, success) {
          if (err) {
              return res.sendStatus(400);
          } else {
              if (success) {
                return res.sendStatus(200);
              }
          }
        });
      }
    });
}

//Get a course info
function getCourseInfo(req, res) {
  database.courseSchema
    .find({
      //search all courses that fits the keyword
      _id: new RegExp(req.params.courseCode, "i")
    },
    function(err, course) {
      if (err) {
        return res.sendStatus(400);
      }
      else {
        if (!course) {
        } else {
          req.title = course.title;
          req.br = course.br;
          req.description = course.description;
          req.courseLevel = course.courseLevel;
        }
      }
    })
    .sort('courseCode')
    .populate({
      path: 'sections',
      populate: {
        path: 'timeslots'
      }
    })
    .exec(function(err, course){
      return res.json(course);
    });
}

function insertSection(req, res) {
  var response = {
      courseCode: req.body.courseCode,
      semester: req.body.semester,
      type: req.body.type,
      sectionCode: req.body.sectionCode,
      instructor: req.body.instructor
  };
  database.courseSchema.findOne({
    _id: response.courseCode
  },
    function(err, course){
      if (!course) {
      }
      else {
        var newSection = new database.courseSectionSchema(response);
        course.sections.push(newSection._id);
        newSection.save(function (err, success) {
          if (err) {
              return res.sendStatus(400);
          } else {
            course.save(function(err, success){
              if (err) {
                  return res.sendStatus(400);
              }
            });
            return res.sendStatus(200);
          }
        });
      }
    });
}

function deleteSection(req, res) {
  var response = {
      courseCode: req.body.courseCode,
      semester: req.body.semester,
      type: req.body.type,
      sectionCode: req.body.sectionCode
  };
  courseSectionSchema.remove(response, function(err) {
    if (err) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  });
}

function updateSection(req, res) { // currently only instructor update is allowed
  database.courseSectionSchema.findOne({
      courseCode: req.body.courseCode,
      semester: req.body.semester,
      type: req.body.type,
      sectionCode: req.body.sectionCode
  },
    function(err, section){
      if (!section) {
        return res.sendStatus(400);
      }
      else {
        section.instructor = req.body.instructor;
        section.save(function(err, success){
          if (err) {
          }
        });
        return res.json(section);
      }
    });
}

function insertTimeslots(req, res) {
  var target = {
    courseCode: req.body.courseCode,
    semester: req.body.semester,
    type: req.body.type,
    sectionCode: req.body.sectionCode
  };
  database.courseSectionSchema.findOne(target
    , function(err, section) {
    if (err) {
      return res.sendStatus(400);
    }
    if(!section) {
      return res.sendStatus(400);
    }
    else {
      var response = {
        cid: section._id,
        weekday: req.body.weekday,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location
      };
      var newTime = new database.courseTimeSchema(response);
      section.timeslots.push(newTime._id);
      section.save(function(err) {
        if (err) {
          return res.sendStatus(400);
        } else {
          newTime.save(function(err) {
            if (err) {
              return res.sendStatus(400);
            } else {
              return res.sendStatus(200);
            }
          });
        }
      });
    }
  })
}


function deleteTimeslot(req, res) {
  var target = {
    courseCode: req.body.courseCode,
    semester: req.body.semester,
    type: req.body.type,
    sectionCode: req.body.sectionCode
  };
  database.courseSectionSchema.findOne(target
    , function(err, section) {
    if (err) {
      return res.sendStatus(400);
    }
    if(!section) {
      return res.sendStatus(400);
    }
    else {
      var response = {
        cid: section._id,
        weekday: req.body.weekday,
        start: req.body.start,
        location: req.body.location
      };
      database.courseTimeSchema.findOne(response, function(err, time){
        if (err) {
          res.sendStatus(400);
        } else {
          var index = section.timeslots.indexOf(time._id);
          section.timeslots.splice(index, 1);
          section.save(function(err) {
            if (err) {
              return res.sendStatus(400);
            } else {
              database.courseTimeSchema.remove(response, function(err) {
                if (err) {
                  return res.sendStatus(400);
                } else {
                  return res.sendStatus(200);
                }
              });
            }
          });
        }
      });

    }
  })
}

// courseSchema
router.post('/insertCourse', insertCourse);
router.get('/:code', getNewCourse);
router.get('/s/:code', getNewCourseMin);

//router.update('/updateCourse', updateCourse);

//router.delete('/deleteCourse', deleteCourse);

// courseSectionSchema
router.post('/insertSection', insertSection);
//router.post('/sectionInfo', getSectionInfo);
router.put('/updateSection', updateSection);
router.delete('/deleteSection', deleteSection);


router.post('/insertTimeslot', insertTimeslots);
router.delete('/deleteTimeslot', deleteTimeslot);

module.exports = router;
