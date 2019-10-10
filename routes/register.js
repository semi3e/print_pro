var express = require('express');
var router = express.Router();
var User = require("../models/Users");

router.get('/', function(req, res, next) {
  res.render('register/register', { title: 'Sign Up' });
});
  
// POST /register
router.post('/', async function(req, res) {

  var isID = await User.findOne({"student_id" : req.body.student_id});
  console.log(isID);
  if (isId != null){
    // 이름
    res.redirect("/register");
  }
  
  var isMail = await User.findOne({"email" : req.body.email});
  console.log(isMail);

  var isSame;
  if (req.body.password === req.body.confirmpassword){
    isSame = true;
  }
  console.log(isSame);


 /* var user = new User({
     id : req.body.id, 
    name : re1.body.name,
    password : req.body.password, 
    confirmpassword : req.body.confirmpassword, 
    email : req.body.email
  });
  console.log(user);

  var t = await user.save();

  res.redirect("/register");*/
});
  

module.exports = router;