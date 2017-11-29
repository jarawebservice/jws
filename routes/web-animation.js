var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('web-animation', { title: 'Web Animation', content: 'When can take you idea, and portray it using web animation' });
});

module.exports = router;