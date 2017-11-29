var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('web-hosting', { title: 'Web Hosting', content: 'Our web hosting packages provide you with a wild variety of options to choose from, from Virtual Private Server(VPS) to virtual private cloud to AWS and Microsoft Azure ' });
});

module.exports = router;