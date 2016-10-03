var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var ctrlProducts = require('../controllers/products');
var ctrlAuth = require('../controllers/authentication');

router.get('/welcome', ctrlProducts.welcome);
router.get('/shop', ctrlProducts.list_products);
router.post('/shop', auth, ctrlProducts.create_product);
router.get('/shop/:productctg/:producturl', ctrlProducts.show_product);
router.put('/shop/:productctg/:producturl', auth, ctrlProducts.update_product);
router.delete('/shop/:productctg/:producturl', auth, ctrlProducts.delete_product);
router.get('/shop/listctg/', ctrlProducts.list_ctg);
router.get('/shop/:productctg/', ctrlProducts.list_by_ctg);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
