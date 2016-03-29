/**
 * Created by Ganother on 3/24/16.
 */

var mongoose = require('mongoose');

var uri = 'mongodb://username:password@hostname:port/databasename';
uri = 'mongodb://localhost/mongo';

mongoose.connect(uri);

var BookSchma = new mongoose.Schema({
  name: String,
  author: String,
  publishTime: Date
});

mongoose.model('Book', BookSchma);
