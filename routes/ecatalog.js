var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ecatalog', { title: 'ecatalog', content: 'We can help you knock out the best e-catalog for your business ' });
});

module.exports = router;