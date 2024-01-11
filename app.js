/** @format */

const express = require('express');
const path = require('path');

const Sequelize = require('sequelize');

// database
const db = require('./utils/database');

// session
const session = require('express-session');
const sessionStore = require('connect-session-sequelize')(session.Store);

// flash session
const flash = require('connect-flash');

// csrf token
const csrf = require('csurf');

// send mail using nodemailer and gmail
const nodemailer = require('nodemailer');

const storeDb = new sessionStore({
	db: db,
});

// router
const adminRouter = require('./routes/adminRouter');
const shopRouter = require('./routes/shopRouter');
const authRouter = require('./routes/auth');

// model
const Product = require('./model/productModel');
const User = require('./model/users');
const Cart = require('./model/cart');
const CartItem = require('./model/cart-item');

// test model
const Person = require('./model/test/person');
const Contact = require('./model/test/contactInfo');

const app = express();

// csrf protection
const csrfProtection = csrf();

// setting view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// for parsing data
app.use(express.urlencoded({ extended: false }));
// setting static file dir
app.use(express.static(path.join(__dirname, 'public')));
// use session
app.use(
	session({
		secret: 'long string in session',
		resave: false,
		saveUninitialized: false,
		store: storeDb,
	}),
);

// csrf protection
app.use(csrfProtection);
// flash session
app.use(flash());
/**
 * setting routes
 */
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findOne({ where: { id: req.session.user.id } })
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});
// available for all render
app.use((req, res, next) => {
	res.locals.isLoggedIn = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use('/admin', adminRouter);

app.use(shopRouter);

app.use(authRouter);

// creating relation
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
/**
 * test association
 */

/**
 * creating one-to-one relation
 * hasOne belongsTo
 */

Person.hasOne(Contact, {
	foriegnKey: {
		type: Sequelize.UUID,
		allowNull: false,
	},
});
Contact.belongsTo(Person);

/**
 * Setting all model
 */
storeDb.sync();
// .sync({force: true})
db.sync()
	.then((result) => {
		app.listen(9000);
	})
	.catch((err) => {
		console.log(err);
	});
