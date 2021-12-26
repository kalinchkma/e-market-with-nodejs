const express = require('express');

// controller
const shopController = require('../controllers/shopController');
// test controller
const testController = require('../controllers/testController');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/shop',shopController.getShop);
router.get('/product/:id', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.addToCart);

module.exports = router;