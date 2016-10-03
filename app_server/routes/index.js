var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
/* GET home page. */
router.get('/', ctrlMain.welcome);
router.get('/shop', ctrlMain.list_products);
router.get('/shop/:productctg', ctrlMain.list_by_categ);
router.get('/shop/:productctg/:producturl', ctrlMain.show_product);
router.get('/contact', ctrlMain.contact);

router.get('/admin', ctrlMain.admin);

module.exports = router;
