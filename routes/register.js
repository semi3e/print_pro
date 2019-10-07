var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register/register', { title: 'Sign Up' });
  });
  
  // POST /register
  router.post('/', async function(req, res) {
    // if (req.body.email &&
    //   req.body.name &&
    //   req.body.favoriteBook &&
    //   req.body.password &&
    //   req.body.confirmPassword) {
  
    //     // confirm that user typed same password twice
    //     if (req.body.password !== req.body.confirmPassword) {
    //       var err = new Error('Passwords do not match.');
    //       err.status = 400;
    //       return next(err);
    //     }
  
    //     create object with form input
    //     var userData = {
    //       email: req.body.email,
    //       name: req.body.name,
    //       favoriteBook: req.body.favoriteBook,
    //       password: req.body.password
    //     };
  
    //     // use schema's `create` method to insert document into Mongo
    //     User.create(userData, function (error, user) {
    //       if (error) {
    //         return next(error);
    //       } else {
    //         req.session.userId = user._id;
    //         return res.redirect('/');
    //       }
    //     });
  
    //   } else {
    //     var err = new Error('All fields required.');
    //     err.status = 400;
    //     return next(err);
    //   }

    var new_register = new Register({student_id : req.body.student_id, password : req.body.password, confirmpassword : req.body.confirmpassword, email : req.body.email});
    await new_register.save(function(err, data){
      if(err){
        res.redirect("/register")
      }
    });
    res.redirect("/register");
  });
  

  module.exports = router;