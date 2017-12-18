var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('profile', { title: 'User Profile | JWS', content: 'Manage your domain here' });
});

module.exports = router;