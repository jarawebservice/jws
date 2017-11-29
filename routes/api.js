var express = require('express');
var router = express.Router();

// express.locals.description = 'We help you design you APIs using Representation State Transfer and  WCF SOAP application programming interface: we can build APIs around your business model';

router.get('/', function(req, res, next) {
    res.render('application-programming-interface', { title: 'Application Programming Interface', content: 'We help you design you APIs using Representation State Transfer and  WCF SOAP ' });
});

module.exports = router;