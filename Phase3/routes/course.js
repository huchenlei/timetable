var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* A course should consists of departmentID, courseNum, br (breadthRequirement),
 * timeslot, and courseDescription
 */
//Create a course
function insertCourse(req, res) {
  var response = {
      _id: req.body.courseCode,
      title: req.body.title,
      description: req.body.description,
      br: req.body.br
  };
  database.courseSchema.count({_id: req.body.courseCode},
    function(err, count){
      if (count > 0) {
        console.log("course exists");
        return res.sendStatus(400);
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
  var results = [];
  database.courseSchema
    .findOne({
      _id: req.params.courseCode
    },
    function(err, course) {
      if (err) {
        return res.sendStatus(400);
      }
      else {
        if (!course) {
          console.log("No course found.")
        } else {
          req.title = course.title;
          req.br = course.br;
          req.description = course.description;
        }
      }
    })
    .populate({
      path: 'sections',
      match: {semester: req.params.semester},
      populate: {
        path: 'timeslots'
      }
    })
    .exec(function(err, sections){
      return res.json(sections);
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

// database.courseSectionSchema.pre('remove', function(next) {
//     var query = database.courseTimeslotSchema.remove({cid: this._id});
//     query.exec(function(err){
//       if (err) {
//         var error = new Error("Delete timeslot fail");
//         next(error);
//       } else {
//         next();
//       }
//     });
// });
// function deleteSection(req, res) {
//   var response = {
//       courseCode: req.body.courseCode,
//       semester: req.body.semester,
//       type: req.body.type,
//       sectionCode: req.body.sectionCode
//   };
//   database.courseSchema.findOne({
//       _id: response.courseCode
//   }).then(function(err, course){
//       if (err) {
//         console.log("error: looking for course");
//         res.sendStatus(400);
//       }
//       if (!course) {
//         console.log("course does not exists");
//         return res.sendStatus(400);
//       }
//     }
//     database.courseSectionSchema.findOne(responsefunction (err, section) {
//       if (err) {
//           console.log("section look up error");
//           console.log(response);
//           return res.sendStatus(400);
//       } else {
//         if (!section) {
//           console.log("section does not exists");
//           return res.sendStatus(400);
//         }
//       }
//     })
//   ).then(
//     var index = course.sections.indexOf(section._id);
//     course.sections.splice(index, 1);
//     course.save(function(err, success){
//       if (err) {
//           console.log("delete course section from course error");
//           return res.sendStatus(400);
//       }
//     });
//   ).then(
//     database.courseSectionSchema.findOne(response, function (err) {
//       if (err) {
//         console.log("error: delete section tuple");
//         return res.sendStatus(400);
//       } else {
//         return res.json(course);
//       }
//     });
//   );
// }

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

      var index = section.timeslots.indexOf(newTime._id);
      section.splice(index, 1);
      section.save(function(err) {
        if (err) {
          console.log("delete from section fail");
          return res.sendStatus(400);
        }
      });
      database.courseTimeSchema.remove(response, function(err) {
        if (err) {
          console.log("delete timeslot fail");
          return res.sendStatus(400);
        }
      });
      return res.sendStatus(200);
    }
  })
}



// courseSchema
router.post('/insertCourse', insertCourse); 
router.get('/courseInfo/:semester/:courseCode', getCourseInfo);
//router.update('/updateCourse', updateCourse);

//router.delete('/deleteCourse', deleteCourse);

// courseSectionSchema
router.post('/insertSection', insertSection);
//router.post('/sectionInfo', getSectionInfo);
router.put('/updateSection', updateSection);
//router.delete('/deleteSection', deleteSection);


router.post('/insertTimeslot', insertTimeslots);
router.delete('/deleteTimeslot', deleteTimeslot);

module.exports = router;
