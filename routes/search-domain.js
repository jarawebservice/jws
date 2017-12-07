var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET users listing. */
var output = '';
router.get('/', function(req, res, next) {
    unirest.get('https://jsonwhois.com/api/v1/whois')
        .headers({
            'Accept': 'application/json',
            'Authorization': 'Token token=907c1a4876cddfb02e8b446577610efc'
        })

    .query({
        "domain": req.query.search_domain
    })

    .end(function(response) {
        output = response.body;
        return next();
    });
}, function(req, res) {
    console.log(output);
    res.render('search-domain', { title: 'Search Result', response: output });
});

module.exports = router;