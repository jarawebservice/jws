var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('case-study', { title: 'JWS - Case Study', description: 'Here are some of the project we have executed' });
});

module.exports = router;