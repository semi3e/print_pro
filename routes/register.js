var express = require('express');
var router = express.Router();
var User = require("../models/Users");
const catchErrors = require("../lib/async-error");

//signup (이게 async 기본 틀. 이 사이에 await 넣으면 됨)
router.get('/', function(req, res, next) {
  res.render('register/register', { title: 'Sign Up' });
});

// 회원가입 폼 검사
function validSignupForm (form){
  var id = form.id || "";
  var name = form.name || "";
  var email = form.email || "";
  var password = form.password || "";
  var confirmpassword = form.confirmpassword || "";
  
  id = id.trim();
  name = name.trim();
  email = email.trim();
  password = password.trim();
  confirmpassword = confirmpassword.trim();

  if( !id ){
    return "유효한 아이디를 입력하세요";
  }

  if( !name ){
    return "유효한 이름을 입력하세요";
  }

  if( !email ){
    return "유효한 이메일을 입력하세요";
  }

  if( !password ){
    return "유효한 비밀번호를 입력하세요";
  }

  if( password != confirmpassword){
    return "비밀번호가 불일치 합니다.";
  }

  return null;
}


// POST /register
router.post('/', async function(req, res) {
   // 데이터가 잘넘어오는지 확인을 위해서
 //  console.log(req.body);
   // 회원 가입 폼 검사하고 req.body로 넘어옴
   var err = validSignupForm(req.body , {needpw: true});
   if(err){
     // flash 설정은 나중에
     req.flash('danger', err);
     return res.redirect('/register');
   }

 // 가입된 유저인지 확인
  var user = await User.findOne({email:req.body.email});
  if(user){
    req.flash('danger', "중복된 사용자가 있습니다.");
    return res.redirect('back');
  }

 // 아이디 중복 확인
  var id = await User.findOne({id:req.body.id});
  if (id){
    req.flash('danger', "중복된 아이디가 있습니다.");
    return res.redirect('back');
  }

  // 스키마에 저장
  var user = new User({
    id : req.body.id, 
   name : req.body.name,
   email : req.body.email
 });

  // 비밀번호 hash해서 저장
  user.password = await user.generateHash(req.body.password);
  console.log(user);

  user.confirmpassword = await user.generateHash(req.body.confirmpassword);
  console.log(user);

//  db에 저장
await user.save();

   req.flash('success', "회원 가입 성공");
   res.redirect("/");

});
  

module.exports = router;