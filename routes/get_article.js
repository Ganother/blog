/**
 * Created by Ganother on 6/6/16.
 */

require("./models.js");

var express = require('express');
var mongoose = require('mongoose');
var request = require('request');

var getArticle = express();


request.get(
  {
    url: "https://api.github.com/repos/Ganother/blog/issues",
    encoding: 'utf8',
    headers: {'User-Agent': 'request'}
  },
  function (error, response, body) {
    if (response.statusCode == 200) {
      var detail = JSON.parse(body);
      var mArticle = mongoose.model('Article');
      var isHave = false;
      var list = [];
      mArticle.find({}, function (err, results) {
        list = results;
        for (var i = 0, length = detail.length; i < length; i++) {
          for (var j = 0, length1 = list.length; j < length1; j++) {
            if (list[j].articleId == detail[i].id) {
              isHave = true;
            }
          }
          if (!isHave) {
            var random = Math.floor(Math.random()*6)+1;
            var book = new mArticle({
              title: detail[i].title,
              author: "Ganother",
              gitUrl: detail[i].url, //文章的git接口地址
              status: 1,
              imgUrl: '/images/article_0'+random+'.jpg',
              articleId: detail[i].id,
              headUrl: '/images/head.jpg'
            });
            book.save(function (err) {
              console.log('save status', err ? 'failed' : 'success');
            })
          }

        }
      });

    } else {
      console.log(response.statusCode);
    }
  }
)

module.export = getArticle;

