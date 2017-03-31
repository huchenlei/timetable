function userExport(database, router) {
//add user, and if username already exists, send 400 status
function addUser(req, res) {

  var profile = {
    _id: req.body.userName,
    passWord: req.body.passWord,
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress
  };

  database.userSchema.count({_id: req.body.userName},
  function(err, count){
    if (count > 0){
      console.log("username already exists");
      return res.sendStatus(403);
    } else {
      new database.userSchema(profile).save(function (err, success){
        if (err) {
          console.log(profile);
          return res.sendStatus(400);
        } else {
          if (success) {
            return res.redirect("/");
          }
        }
      });
    }
  });
}

//get user's info
function getUserInfo(req, res) {
  var results = [];
  database.userSchema.findOne({
    _id:req.params.userName
  }, function(err, user) {
    if (err) {
      return res.sendStatus(400);
    } else {
      if (!user) {
        console.log("no user found.");
      } else {
        // req.fullName = user.fullName;
        // req.emailAdress = user.emailAdress;
      }
    }
  }).populate({
    path: 'courses',
    populate: {
      path: 'timeslots'
    }
  })
  .populate('preferences')
  .exec(function(err, userName){
    return res.json(userName);
  });
}

//suspend user
function suspendUser(req, res) {
  database.userSchema.count({ _id: req.params.userName},
  function(err, count){
    if (err){
      console.log("error in suspendUser");
      return res.sendStatus(400);
    } else {
      if (count == 0) {
        console.log("user doesn't exist");
        return res.sendStatus(401);
      } else {

        database.userSchema.findOne({
          _id:req.params.userName
        }, function(err, user){
          if (!user) {
            return res.sendStatus(404);
          }
          user.remove(function(err) {
            if (err) {
              return res.sendStatus(400);
            } else {
              return res.sendStatus(200);
            }
          });
        });
          console.log("after delete");
      }
    }
  });
}

function addUserCourse(req, res) {

  //find user
  database.userSchema.findOne({
    _id:req.params.userName
  }, function(err, user){
    if (!user) {
      console.log("usernot found");
      return res.sendStatus(400);
    } else {
      database.courseSectionSchema.findOne({
        courseCode: req.body.courseCode,
        sectionCode: req.body.sectionCode,
        semester: req.body.semester,
        type: req.body.type
      }, function(err, section){
        if (!section){
          console.log("cannot find section");
        } else {
          user.courses.push(section._id);
          user.save(function(err, success){
            if (err) {
              console.log("user saving error");
              return res.sendStatus(400);
            } else {
              console.log("user saving success");
              return res.json(user);
            }
          });
        }
      });
    }
  });
}

//user.courses.push(course._id)
//update user info
function updateUser(req, res) {
  database.userSchema.count({_id:req.params.userName},
  function(err, count){
    if (err) {
      console.log("error in update");
      return res.sendStatus(400);
    } else {
      if (count == 0) {
        console.log("user doesn't exist");
        return res.sendStatus(400);
      } else {

        var updateJSON = {};
        if (req.body.passWord) {

          updateJSON.passWord = req.body.passWord;
        }
        if (req.body.emailAdress) {

          updateJSON.emailAdress = req.body.emailAdress;
        }
        if (req.body.fullName) {

          updateJSON.fullName = req.body.fullName;
        }
        database.userSchema.updateOne({
          _id:req.params.userName
        }, {
          $set: updateJSON
        }, function(err, result){
          if (err){

            res.sendStatus(403);

          } else {

            res.sendStatus(200);
          }
        });
      }
    }
  });
}

function insertPreference(req, res) {
  var newPreference = {
    uid: req.params.userName,
    type: req.body.type,
    value: req.body.value
  };
  var response = new database.preferenceSchema(newPreference);
  response.save(function (err) {
    if (err) {
      console.log(err.message);
      return res.sendStatus(400);
    } else {
      return res.sendStatus(200);
    }
  });
}

function checkUserExist(req, res, next) {
  database.userSchema.findOne({_id: req.params.userName}, function(err, user) {
    if (err || !user) {
      console.log("error: finding user");
      res.sendStatus(400);
    } else {
      next();
    }
  })
}

router.post('/addUser', addUser);
router.get('/users/info/:userName', getUserInfo);
router.delete('/users/info/:userName', suspendUser);
router.put('/users/info/:userName', updateUser);
router.post('/users/info/:userName/:courses', addUserCourse);

router.post('/users/insertPreference/:userName', checkUserExist, insertPreference);
//router.get('/preferenceList/:userName', getPreferenceList);
}
module.exports = userExport;
