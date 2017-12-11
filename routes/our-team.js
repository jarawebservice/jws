var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('team', { title: 'JWS - Team', description: 'We rely on the expertise of our team to deliver projects ahead of schedule' });
});

module.exports = router;