var express = require('express');
var router = express.Router();

/* main page. */
router.get('/', function(req, res, next) {
  // test
  res.render('home/main', { title: 'print_pro',message: '프젝 화이팅!' });
});

/* manual page. */
router.get('/manual', function(req,res,next){
  res.render('home/manual');
});

/*myongjin page. */
router.get('/myongjin', function(req,res,next){
  res.render('home/myongjin');
});

/*ogong page. */
router.get('/ogong', function(req,res,netx){
  res.render('home/ogong');
});



module.exports = router;
