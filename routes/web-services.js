var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('video-conferencing', { title: 'Web Services', content: 'When you want to take your idea from just a single application and turn it into an agent capable of being consumed by people all over the globe, we have got you covered' });
});

module.exports = router;