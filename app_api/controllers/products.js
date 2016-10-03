var mongoose = require('mongoose');
var Prod = mongoose.model('Product');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.welcome = function(req, res){
  Prod.find().sort({ createdOn : -1 }).limit(4).exec(function(err, product){
    if(err) {
      res.json(err);
    } else {
      sendJSONresponse(res, 200, product);
    }
  });
};

module.exports.list_products = function(req, res){
  Prod.find(function(err, products){
    if (err){
      res.json(err);
    } else {
      res.json(products);
    }
  });
};

module.exports.create_product = function(req, res){
  function normalize(texto) {
  texto = texto.replace(/[áàäâ]/g, "a");
  texto = texto.replace(/[éèëê]/g, "e");
  texto = texto.replace(/[íìïî]/g, "i");
  texto = texto.replace(/[óòôö]/g, "o");
  texto = texto.replace(/[úùüü]/g, "u");
  texto = texto.replace(/[ñ]/g, "n");
  return texto;
  }
  var titleUrl = normalize(String(req.body.title).replace(/ /g,"_"));
  var categoryUrl = normalize(String(req.body.category).replace(/ /g,'_'));
  var price = String(req.body.price).replace(',','.');
  var img = String(req.body.img).replace(/ /g,'');
  Prod.create({
    url: titleUrl,
    categoryurl : categoryUrl,
    title: req.body.title,
    description: req.body.description,
    price: price,
    category: req.body.category,
    img: img.split(','),
    banner: req.body.banner,
    }, function(err, product){
    if (err){
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, product);
    }
  });
};

module.exports.show_product = function(req, res){
    Prod
        .find({url : req.params.producturl, categoryurl : req.params.productctg})
        .exec(function(err, product){
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            sendJSONresponse(res, 200, product);
          }
        });
};

module.exports.update_product = function(req, res){
  function normalize(texto) {
  texto = texto.replace(/[áàäâ]/g, "a");
  texto = texto.replace(/[éèëê]/g, "e");
  texto = texto.replace(/[íìïî]/g, "i");
  texto = texto.replace(/[óòôö]/g, "o");
  texto = texto.replace(/[úùüü]/g, "u");
  texto = texto.replace(/[ñ]/g, "n");
  return texto;
  }
  var titleUrl = normalize(String(req.body.title).replace(/ /g,"_"));
  var categoryUrl2 = normalize(String(req.body.category).replace(/ /g,'_'));
  var price = String(req.body.price).replace(',','.');
  var img = String(req.body.img).replace(/ /g,'');
  Prod
      .findOne({url : req.params.producturl, categoryurl: req.params.productctg}, function(err, product){
        product.url = titleUrl;
        product.categoryurl = categoryUrl2;
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = price;
        product.category = req.body.category;
        product.img = img.split(',');
        product.banner = req.body.banner;
        product.save(function(err){
          if (err){
            res.json(err);
          } else {
            res.json(product);
          }
        });
      });
};

module.exports.delete_product = function(req, res){
   Prod
      .findOne({url: req.params.producturl, categoryurl: req.params.productctg}, function(err, product){
        product.remove(function(err, product){
          if (err){
            res.json(err);
          } else {
            res.status(200);
            res.json(product);
          }
        });
      });
};


module.exports.list_ctg = function(req, res){
  Prod
      .find()
      .distinct('category', function(err, category){
        if (err){
          res.status(400);
        } else {
          sendJSONresponse(res, 200, category);
        }
      });
};

module.exports.list_by_ctg = function(req, res){
  Prod
      .find({categoryurl: req.params.productctg})
      .exec(function(err, products){
        if(err){
          res.status(400);
        } else {
          sendJSONresponse(res ,200, products);
        }
      });
};
