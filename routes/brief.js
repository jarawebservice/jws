var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('briefs', { title: 'briefs', content: 'This area contains all the briefs' });
});

router.get('/add-brief/:id', function(req, res, next) {
    res.render('add-brief', { title: 'Add brief', content: 'Add a brief here' });
});
router.get('/get-brief/:id', function(req, res, next) {
    res.render('get-brief', { title: 'get brief', content: 'get a brief here' });
});
router.get('/delete-brief/:id', function(req, res, next) {
    res.render('delete-brief', { title: 'Delete brief', content: 'delete a brief here' });
});

module.exports = router;