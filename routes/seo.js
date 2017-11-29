var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('seo', { title: 'Search Engine Optimization', content: 'We have a dedicated team that can analyze your website and look for patterns in Search Engine optimization practices ' });
});

module.exports = router;