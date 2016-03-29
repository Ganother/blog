/**
 * Created by Ganother on 3/24/16.
 */

var mongoose = require('mongoose');

require('./routes/models.js');

var Book = mongoose.model('Article');

var book = new Book({
  title: '前端日常积累',
  author: 'Ganother',
  gitUrl: 'https://api.github.com/repos/Ganother/some-points/issues/1', //文章的git接口地址
  status: 1,
  imgUrl: '/images/article_01.jpg',
  headUrl: '/images/head.jpg'
});

book.save(function(err){
  console.log('save status', err ? 'failed' : 'success');
})