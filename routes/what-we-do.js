var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('what-we-do', { title: 'What we do', content: 'We are Jare Web Services' });
});

module.exports = router;