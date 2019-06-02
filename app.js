const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//DB Config
const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser:true })
    .then( () => console.log("MongoDB Connected...."))
    .catch( err => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs"); // 매뉴얼에 이렇게 하도록 미리 세팅이 되어 있음 암기

// Express body parser
app.use(express.urlencoded({ extended:true }));

// exress session
app.use(session({
    secret: "screat",
    resave: true,
    saveUninitialized: true
}));

// connect flash
app.use(flash());

// Global Vars
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});
app.use("/", require("./routers/index"));
app.use("/users", require("./routers/users"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
