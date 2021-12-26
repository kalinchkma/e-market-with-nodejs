const productModel = require('../model/productModel');

/**
 * 
 * render all product to the shop
 */

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',{
        pageTitle: "Add Product",
        isLoggedIn: req.session.isLoggedIn
    });
};
/**
 * 
 * add a product to the shop
 */
exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.image;
    const description = req.body.desc;
    req.user.createProduct({
         title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    })
    // productModel.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     userId: req.user.id
    // })
    .then(res => {
        console.log("its ok");
      
    }).catch(err => {
        console.log(err);
    });
    res.redirect("/shop");
};

/**
 * get admin product
 */
exports.getAdminProduct = (req, res, next) => {
    productModel.findAll().then(products => {
        res.render('admin/admin-product',{
            pageTitle: "Admin Product",
            prods: products,
            isLoggedIn: req.session.isLoggedIn
        })
    }).catch(err => {
        console.log(err);
    })
  
};

/**
 * edit the specific product
 */

exports.getEditProduct = (req, res, next) => {
    const qp = req.query.edit;
    const an = req.query.another;
    console.log(an);
    console.log(qp);
    const prodId = req.params.id;
    productModel.findOne({where: {id: prodId}})
    .then(product => {
        res.render('admin/edit', {
            pageTitle: "Edit Product",
            prod: product,
            isLoggedIn: req.session.isLoggedIn
        })
    }).catch(err => {
        console.log(err);

    })
  
}
/**
 * edit product
 */
exports.getEdit = (req, res, next) => {
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.image;
    const updatedDesc = req.body.desc;
    productModel.findOne({where: {id: prodId}})
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImage;
        product.description = updatedDesc;
        return product.save();
    })
    .then(result => {
        console.log("Updated result");
        res.redirect(`/admin/edit-product/${prodId}`);
    })
    .catch(err => {
        console.log(err);
    });
};

/**
 * delete products
 */

exports.getDelete = (req, res, next) => {
    const prodId = req.params.id;
    productModel.findOne({where: {id: prodId}})
    .then(product => {
        return product.destroy();
    }).then(result => {
        console.log(result);
        res.redirect('/admin/admin-product');
    }).catch(err => {
        console.log(err);
    });
};


