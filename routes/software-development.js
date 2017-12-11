var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('software-development', { title: 'Software Development', content: 'Our software development shop is number one in Nigeria. We make sure we meet you at the point of your need ' });
});

module.exports = router;