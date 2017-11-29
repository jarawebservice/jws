var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'jara web Service', description: 'Jaracare helps company achieve the goals using the right technologies as a lever' });
});

module.exports = router;