var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Hermeshop';
var dbpassword = process.env.DB_PASSWORD;
var dbuser = process.env.DB_USER;
if (process.env.NODE_ENV === 'production'){
 dbURI = 'mongodb://' + dbuser + ':' + dbpassword + '@ds147975.mlab.com:47975/hermeshop';
}

mongoose.connect(dbURI);

require('./product');
require('./user');
