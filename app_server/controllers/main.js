var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};

module.exports.welcome = function(req, res) {
  var requestOptions, path;
  path = '/api/welcome/';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(requestOptions, function(err, response, body){
    if (err){
      console.log(err);
    } else {
      res.render('welcome', { products : body, title : 'Welcome' });
    }
  });
};

module.exports.list_products = function(req, res) {
  res.render('list_products', { title: 'All products' });
};

module.exports.list_by_categ = function(req, res) {
  var requestOptions, path;
  path = '/api/shop/' + req.params.productctg;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(requestOptions, function(err, response, body){
    if (err){
      console.log(err);
    } else {
      res.render('list_by_categ', { products : body, title: String(body[0].category) });
    }
  });
};

module.exports.show_product = function(req, res){
  var requestOptions, path;
  path = '/api/shop/' + req.params.productctg + '/' + req.params.producturl;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(requestOptions, function(err, response, body){
    if (err){
      console.log(err);
    } else {
      res.render('show_product', {
        product : body[0],
        title : String(body[0].title)
      });
    }
  });
};

module.exports.contact = function(req, res) {
  res.render('contact', {title: 'Contact'});
};

module.exports.admin = function(req, res){
  res.render('adminLayout', {title: 'Admin'});
};
