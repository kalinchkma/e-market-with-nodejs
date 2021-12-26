
const productModel = require('../model/productModel');

exports.getIndex = (req, res, next) => {
    
    productModel.findAll()
    .then(products => {
        res.render('shop/index', {
            pageTitle: "Home",
            prods: products,
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
  
}

exports.getShop = (req, res, next) => {
    productModel.findAll()
    .then(products => {
        res.render('shop/shop', {
            pageTitle: "Shop",
            prods: products,
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    console.log(prodId);
    productModel.findOne({where: {id: prodId}})
    .then(products => {
        
        res.render('shop/product',{
            pageTitle: "Product",
            prod: products,
            isLoggedIn: req.session.isLoggedIn
        });
    }).catch(err => {
        console.log(err)
    });
};

// get to cart

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(product => {
       res.render('shop/cart', {
            pageTitle: "Cart",
            isLoggedIn: req.session.isLoggedIn

       });
    }).catch(err =>{
        console.log(err);
    });
};

// add to cart

exports.addToCart = (req, res, next) => {
    const prodId = req.body.prodId;
   
};