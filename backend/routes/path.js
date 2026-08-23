var express = require("express");
var router = express.Router();

router.get('/', (req,res) => {
    console.log("Hello");
    res.send("<h1>Hello World</h1>");
});

module.exports = router;


