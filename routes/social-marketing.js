var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('social-marketing', { title: 'Social Marketing', content: 'Our social marketing strategy is the best and and cost saving you can get. We put you across all social platforms within a short while' });
});

module.exports = router;