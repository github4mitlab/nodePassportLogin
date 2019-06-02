const localStategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

module.exports = function (passport) {
    passport.use(
        new localStategy({usernameField: "email"}, (email, password, done) => {
            userModel
                .findOne({email: email})
                .then( user => {
                    if(!user) {
                        return done(null, false, { message: "That email is not registered"});
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Passord Incorrect"});
                        }
                    })
                })
                .catch( err => console.log(err));

        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deSerializeUser((id, done) =>{
        userModel.findOne(id, (err, user) => {
            done(err, user);
        });
    });
};