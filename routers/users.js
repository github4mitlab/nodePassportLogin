const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("Login");
});

router.post("/register", (req, res) => {
    //res.render("register");
    console.log(req.body);
    res.send("hi");
    //res.render("register");
});


module.exports = router;
