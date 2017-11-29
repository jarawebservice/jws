var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('mobile', { title: 'Mobile application development', content: 'We have a knack for cross-platform Xamarin and android development ' });
});

module.exports = router;