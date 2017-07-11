var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* A course should consists of departmentID, courseNum, br (breadthRequirement),
 * timeslot, and courseDescription
 */

function getNewCourse(req, res) {
  var code = req.params.code;
  var semester = req.params.semester;
  console.log("Receive " + code);
  database.courseSchema.find({
    code: new RegExp(code, 'i'),
    term: semester,
    campus: "UTSG"
  },
    function(err, courses){
      if (courses.length == 0) {
        console.log("course not found");
        return res.sendStatus(404);
      }
      else {
        return res.json(courses);
      }
    });
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
        console.log("course exists");
        return res.sendStatus(403);
      }
      else {
        new database.courseSchema(response).save(function (err, success) {
          if (err) {
              console.log(response);
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
      console.log(req.params.courseCode)
      if (err) {
        return res.sendStatus(400);
      }
      else {
        if (!course) {
          console.log("No course found.")
        } else {
          console.log("success");
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
      console.log("rstatus");
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
        console.log("course does not exists");
        return res.sendStatus(400);
      }
      else {
        var newSection = new database.courseSectionSchema(response);
        course.sections.push(newSection._id);
        newSection.save(function (err, success) {
          if (err) {
              console.log("new section error");
              console.log(response);
              return res.sendStatus(400);
          } else {
            console.log(course.sections);
            course.save(function(err, success){
              if (err) {
                  console.log("update course error");
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
      console.log(err);
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
        console.log("course section does not exists");
        return res.sendStatus(400);
      }
      else {
        section.instructor = req.body.instructor;
        section.save(function(err, success){
          if (err) {
              console.log("update course section error");
              return res.sendStatus(400);
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
      console.log("error finding section");
      return res.sendStatus(400);
    }
    if(!section) {
      console.log("section not found");
      console.log(target);
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
          console.log("update section fail");
          return res.sendStatus(400);
        } else {
          newTime.save(function(err) {
            if (err) {
              console.log("update timeslot fail");
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
      console.log("error finding section");
      return res.sendStatus(400);
    }
    if(!section) {
      console.log("section not found");
      console.log(target);
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
          console.log("error finding the time");
          res.sendStatus(400);
        } else {
          var index = section.timeslots.indexOf(time._id);
          section.timeslots.splice(index, 1);
          section.save(function(err) {
            if (err) {
              console.log("delete from section fail");
              return res.sendStatus(400);
            } else {
              database.courseTimeSchema.remove(response, function(err) {
                if (err) {
                  console.log("delete timeslot fail");
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



// function smart(req, res) {
//   preference_sort(function(sorted) {
//     compute_valid_solutions(sorted, function(solutions) {
//       return res.json(solutions);
//     });
//   });
// }



// courseSchema
router.post('/insertCourse', insertCourse);
router.get('/:code/semester/:semester', getNewCourse);
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
