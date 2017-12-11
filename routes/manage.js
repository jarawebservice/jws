var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('manage', { title: 'Manage Website', content: 'you can manage your website here ' });
});

router.get('/schedule/add', (req, res, next) => {
    res.render('addSchedule', { title: 'Add Schedule', content: 'you can manage your website here ' });
});

router.get('/nda/add', (req, res, next) => {
    res.render('addNda', { title: 'Create NDA', content: 'Add NDA here' });
});

router.get('/manage/estimate', (req, res, next) => {
    res.render('addEstimate', { title: 'Create Estimate ', content: 'Add Estimate here ' });
});

router.get('/brief', (req, res, next) => {
    res.render('addBrief', { title: 'Create Brief', content: 'Add brief here here ' });
});


module.exports = router;