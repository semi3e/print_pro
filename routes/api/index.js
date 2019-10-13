var local = require('./localStrategy');
//var kakao = require('./kakaoStrategy');
var User = require('../../models/Users');
 
module.exports = (passport) => {
    passport.serializeUser((user, done) => {//사용자 정보 객체를 세션에 저장하는 기능
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {//세션에 저장한 아이디를통해 사용자 정보 객체를 불러오는 기능
        User.findOne({id: id})
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    
    local(passport);
    //kakao(passport);
};

