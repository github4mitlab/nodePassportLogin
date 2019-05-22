const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

router.get("/login", (req, res) => {
    res.render("Login");
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
