const bcrypt = require('bcryptjs');
const User = require('../model/users');

exports.getLogin = (req, res, next) => {
    // cookie parsing
    // const isLoggedIn = req.get('Cookie').split('=')[1];
        let message = req.flash('error');
        if(message.length > 0) {
            message = message;
        } else {
            message = null;
        }
        res.render('auth/login', {
            pageTitle: 'Login',
            errorMessage: message
        });

};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=ture; Max-Age=10');
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({where: {email: email}}).then(user => {
        if(!user) {
            req.flash('error', "Invalid email or password.");
            return res.redirect('/login');
        }
        pass = user.password;
        bcrypt.compare(password, pass).then(doMatch => {
            if(doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                        res.redirect('/');
                });
            }
            req.flash('error', "Invalid email or password.");
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}

exports.getsignup = (req, res, next) => {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('auth/signup', {
            pageTitle: "Signup",
            errorMessage: message
        });
  
}

exports.postUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const comfirmPassword = req.body.comfirmPassword;

    User.findOne({where: {email: email}})
    .then(userDoc => {
        if(userDoc) {
            req.flash('error', "Email exists  already, please pick a different one"); 
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            User.create({
                email: email,
                password: hashedPassword
            }).then(result => {
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}


/*
{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"isLoggedIn":true,"user":{"id":3,"email":"chakma.kalin10211@gmail.com","password":"$2a$12$2ZAPybXCyBJ9sL9vZecnmOehSS0PUxbGroTL/qInqp54/T95R4o/O","createdAt":"2021-09-01T16:46:55.000Z","updatedAt":"2021-09-01T16:46:55.000Z"}}
*/