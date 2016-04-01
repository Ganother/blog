/**
 * Created by Ganother on 3/24/16.
 */

var mongoose = require('mongoose');

require('./routes/models.js');

var Book = mongoose.model('Article');

var book = new Book({
  title: '猫哥网络编程系列：HTTP PEM 万能调试法',
  author: 'kaiye',
  gitUrl: 'https://api.github.com/repos/kaiye/kaiye.github.com/issues/4', //文章的git接口地址
  status: 1,
  imgUrl: '/images/article_06.jpg',
  headUrl: '/images/head_02.jpeg'
});

book.save(function(err){
  console.log('save status', err ? 'failed' : 'success');
})