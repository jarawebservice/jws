var express = require('express');
var router = express.Router();

// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('blog', { title: 'JWS - blog', description: 'Check out the aweseome stuff we blog here' });
});

module.exports = router;