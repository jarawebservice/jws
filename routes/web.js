var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('web', { title: 'web', content: 'Smashing web application for your delight, we build them all. Our technology lattitude provides us with a wide range of candidate solutions to your problems' });
});

module.exports = router;