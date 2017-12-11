var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('who-we-are', { title: 'Who we are', content: 'We are Jare Web Services' });
});

module.exports = router;