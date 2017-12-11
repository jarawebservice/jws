var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('team', { title: 'JWS - portfolio', description: 'Jara Web Services has been involved in some exciting software development projects in the web platform, mobile platform, etc.' });
});

module.exports = router;