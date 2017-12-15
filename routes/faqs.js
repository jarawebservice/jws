var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('faqs', { title: 'FAQs | JWS', description: 'We have compiled a list of questions that pertains to you project here' });
});

module.exports = router;