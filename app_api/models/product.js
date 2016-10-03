var mongoose = require('mongoose');

var product = new mongoose.Schema({
  url: String,
  categoryurl: String,
  title: String,
  description: String,
  price: Number,
  category: String,
  img: [String],
  banner: String,
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

mongoose.model('Product', product);
