/**
 * Created by Ganother on 3/25/16.
 */

//链接mongoose
var mongoose = require('mongoose');

var uri = 'mongodb://username:password@hostname:port/databasename';
uri = 'mongodb://localhost/blog';

mongoose.connect(uri);

//文章列表model
var _Article = new mongoose.Schema({
  title: String,
  author: String,
  gitUrl: String, //文章的git接口地址
  status: Number,
  imgUrl: String,
  headUrl: String
});

mongoose.model('Article', _Article);
