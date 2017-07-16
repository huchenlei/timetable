function userExport(database, router) {
//add user, and if username already exists, send 400 status
function signup(req, res) {

  var profile = {
    _id: req.body.userName,
    passWord: req.body.passWord,
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress
  };

  database.userSchema.count({_id: req.body.userName},
  function(err, count){
    if (count > 0){
      return res.render("signup.html", {error: "username already exists"});
    } else {
      new database.userSchema(profile).save(function (err, success){
        if (err) {
          console.log(profile);
          return res.sendStatus(400);
        } else {
          if (success) {
            req.session.username = req.body.userName;
            req.session.fullname = req.body.fullName;
            req.session.emailaddress = req.body.emailAddress;
            req.session.admin = false;
            return res.redirect("/");
          }
        }
      });
    }
  });
}

function login(req, res) {

  var profile = {
    _id: req.body.userName,
    passWord: req.body.passWord
  };

  database.userSchema.findOne({_id: req.body.userName},
  function(err, user){
    if (!user){
      return res.render("login.html", {error: "username does not exist"});
    } else {
        if (req.body.passWord == user.passWord) {
          req.session.username = user._id;
          req.session.fullname = user.fullName;
          req.session.emailaddress = user.emailAddress;
          req.session.admin = user.admin;
          return res.redirect("/");
        }
        else {
          return res.render("login.html", {error: "password is incorrect"});
        }
    }
  });
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
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
      console.log("user found");
      var idx = user.courses.indexOf(req.body.code);
      if (idx == -1) {
        user.courses.push(req.body.code);
      }
      // TODO: warning course exists
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

function deleteUserCourse(req, res) {
  database.userSchema.findOne({
    _id:req.params.userName
  }, function(err, user){
    if (!user) {
      console.log("usernot found");
      return res.sendStatus(400);
    } else {
        var idx = user.courses.indexOf(req.params.id);
        if (idx > -1) {
          user.courses.splice(idx, 1);
        }
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

function insertPreference_helper(req, res, type, value, callback) {
  var newPreference = {
    uid: req.params.userName,
    type: type,
    value: value
  };
  var response = new database.preferenceSchema(newPreference);
  response.save(function (err) {
    if (err) {
      console.log(err.message);
      return callback();
    }
    console.log("saved");
    return callback();
  });
}

function insertPreference(req, res) {
  console.log("inserting preferences");
  console.log(req.params.userName);
  database.preferenceSchema.remove({uid: req.params.userName}, function(err) {
    if (err) {
      console.log("error inserting preferenceSchema");
      return res.redirect("/");
    } else {
      insertPreference_helper(req, res, "mon", req.body.mon, function(){
      insertPreference_helper(req, res, "tue", req.body.tue, function(){
      insertPreference_helper(req, res, "wed", req.body.wed, function(){
      insertPreference_helper(req, res, "thu", req.body.thu, function(){
      insertPreference_helper(req, res, "fri", req.body.fri, function(){
        return res.redirect("/");
      });});});});});
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



router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/users/info/:userName', getUserInfo);
router.delete('/users/info/:userName', suspendUser);
router.put('/users/info/:userName', updateUser);
router.post('/users/info/:userName/:courses', addUserCourse);
router.delete('/users/deleteCourse/:userName/:id', deleteUserCourse);
router.post('/users/insertPreference/:userName', checkUserExist, insertPreference);
//router.get('/preferenceList/:userName', getPreferenceList);
}
module.exports = userExport;
