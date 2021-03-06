var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var markdown = require('remarkable');
var md = new markdown({
  typographer:  true
});


require('./models.js');

/* GET home page. */

router.get('/', function(req, res, next){
  res.render('book_store.html')
});

router.get('/ganother', function(req, res, next){
  res.render('resume.html')
});


//异步接口
router.get('/get_f2e_list', function(req, res, next){
  var mArticle = mongoose.model('Article');
  mArticle.find({}, function(err, results){
    if(err){
      return next({
        'errcode': 1,
        'errmsg': '获取mongodb数据失败'
      });
    }
    res.json({
      errcode: 0,
      data: results
    });
  });
});

router.get('/get_f2e_detail', function(req, res, next){
  var mArticle = mongoose.model('Article');
  mArticle.find({"_id": req.query.id}, function(err, results){

    if(err){
      return next({
        'errcode': 1,
        'errmsg': '获取mongodb数据失败'
      });
    }

    request.get(
      {
        url:results[0].gitUrl,
        encoding:'utf8',
        headers:{'User-Agent': 'request'}
      },
      function(error, response, body){
        if(response.statusCode == 200){
          var detail = JSON.parse(body);
          res.json({
            errcode: 0,
            data: md.render(detail.body)
          });
        }else{
          console.log(response.statusCode);
        }
      }
    )
  })
});

module.exports = router;
