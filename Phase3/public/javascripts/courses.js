
/* A course should consists of departmentID, courseNum, br (breadthRequirement),
 * timeslot, and courseDescription
 */

//Create a course
app.post('/courses', function(req, res){
  if(!req.body.departmentID || !req.body.courseNum){
    return res.sendStatus(400);
  }
  //check if course already exists, if so send status 403 (forbidden)
  mongo.getDB().collection('courses').count({
    $and: [{departmentID: req.body.departmentID}, {courseNum: req.body.courseNum}]
  }, function(err, count) {
    if (count > 0){
      return res.sendStatus(403);
    }
    //insert into database
    autoIncrement.getNextSequence(mongo.getDB(), 'courses', function(err, autoIndex){
      mongo.getDB().collection('courses').insertOne({
        _id: autoIndex,
        departmentID: req.body.departmentID,
        courseNum: req.body.courseNum,
        br: req.body.br,
        timeslot: req.body.timeslot,
        courseDescription: req.body.courseDescription
      }, function(err, result) {
        res.json({
          //(cid = courseID) should be the primary key
          cID: result.insertedId
        });
      });
    });
  });
});

//Get a course info (cid = courseID)
app.get('/courses/:cid', function(req, res, next) {
  mongo.getDB().collection('courses').find({
      _id: parseInt(req.params.cid)
  }).toArray(function(err, docs){
      if (doc.length == 0)
        return res.sendStatus(403);
      req.departmentID = docs[0].departmentID;
      req.courseNum = docs[0].courseNum;
      req.br = docs[0].br;
      req.timeslot = docs[0].timeslot;
      req.courseDescription = docs[0].courseDescription;
      next();
  });
});

app.get('/courses/:cid', function(req, res) {
  mongo.getDB().collection('courses').find({
    cid: parseInt(req.params.cid)
  }).toArray(function(err, docs){
    res.json({
      cid: parseInt(req.params.cid),
      departmentID: req.departmentID,
      courseNum: req.courseNum,
      br: req.br,
      timeslot: req.timeslot,
      courseDescription: req.courseDescription
    });
  });
});
//Modify/update a course
app.put('/courses/:cid', function(req, res){
  if (!req.body.departmentID && !req.body.courseNum && !req.body.br
     &&!req.body.timeslot && !req.body.courseDescription){
       return res.sendStatus(400);
     }

  var updateCourse = {};
  updateCourse.departmentID = req.body.departmentID;
  updateCourse.courseNum = req.body.courseNum;
  if (req.body.br)
    updateCourse.br = req.body.br;
  if (req.body.timeslot)
    updateCourse.timeslot = req.body.timeslot;
  if (req.body.courseDescription)
    updateCourse.courseDescription = req.body.courseDescription;
  //update
  mongo.getDB().collection('courses').updateOne({
    _id: parseInt(req.params.cid)
  }, {
    $set: updateCourse
  }, function(err, result){
    if (result.matchedCount == 1){
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });
});
//Delete a course
