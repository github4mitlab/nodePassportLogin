const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    //console.log("hi");
    res.render("welcome");
});

//Dashboard Page
router.get("/dashboard", (req, res, next) =>{
    res.render("dashboard");
});

module.exports = router;


