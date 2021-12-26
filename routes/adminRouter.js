const express = require('express');

// auth check

const auth = require('../middleware/is_auth');

// admin controller
const adminController = require("../controllers/adminController");
// product controller
const productController = require("../controllers/productController");

const router = express.Router();

router.get('/dashboard',auth, adminController.getDashboard);

router.get("/add-product",auth, productController.getAddProduct);

router.post("/add-product",productController.postProduct);

router.get("/admin-product",productController.getAdminProduct);

router.get("/edit-product/:id", productController.getEditProduct);

router.post('/edit-product',productController.getEdit);

router.get('/delete-product/:id', productController.getDelete);

module.exports = router;