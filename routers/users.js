const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require("passport");

// User Model
const User = require('../models/User');

// // Login Page
// router.post('/login', (req, res, next) => {
//     passport.authenticate("local", {
//         successRedirect: "/dashboard", 
//         failureRedirect: "/users/login",
//         failureFlash: true
//     })(req, res, next);
// });

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


// Register Page
router.get('/login', (req, res, next) => {
    res.render('login');
});



// Register Page
router.get('/register', (req, res, next) => {
    res.render('register');
});


// Register Handle
router.post('/register', (req, res, next) => {
    // console.log(req.body);
    // res.send('hello');

    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    // Check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // Users exists
                    errors.push({ msg: 'Email already exists' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    // Register User
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // console.log(newUser);
                    // res.send('hello');

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        }

    }
);



module.exports = router;

/* const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

router.get("/login", (req, res) => {
    res.render("login");
});


router.get("/register", (req, res) => {
    res.render("register");
});


router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check Require fields
    if (!name || !email || !password || !password2) { 
        errors.push({ msg: "Please fill in all fields"});
    }
    
    // Check pass match
    if (password !== password2) {
        errors.push({ msg: "Password do not match"});
    }

    // Check pass length
    if (password.length < 6 ) {
        errors.push({msg: "패스워드 6자리 이상으로 해주셈"});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        userModel
        .findOne({ email: email })
        .then( user => {
            if (user) {
                errors.push({msg: "Email Already Exists"});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                
                });
            } else {
                const newUser = new userModel({
                    name, 
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then( user => {
                            req.flash(
                                "success_msg", 
                                "You are now registered and can log in "
                            )
                        })
                        .catch( err => {
                            console.log( err );
                        });
                    });
                });
            }
        
        })
    }
});



module.exports = router;
 */