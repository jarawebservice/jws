var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('video-conferencing', { title: 'Video call conferencing', content: 'Business can use our video conferencing solution to plan meeting ' });
});

module.exports = router;