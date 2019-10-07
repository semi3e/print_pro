var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var app = express();
var mongoose = require('mongoose');//몽구스 db

// //DB
//mongodb+srv://admin:administrator@cluster0-hecuu.mongodb.net/test?retryWrites=true&w=majority// var db = mongoose.connection;
// db.once("open", function(){
//     console.log("DB connect success");//db 연결 성공시
// });
// db.on("error", function(err){
//     console.log("DB connect failed : ",err);//db 연결 실패시
// });

//=======================================================
// mongodb connect
//=======================================================
mongoose.Promise = global.Promise; // ES6 Native Promise를 mongoose에서 사용한다.
const connStr = 'mongodb://localhost/print_pro';
mongoose.connect(connStr, {useNewUrlParser: true,useUnifiedTopology:true });
mongoose.connection.on('error', console.error);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


//route
//route 위치 중요
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');//게시판

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);//게시판 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
