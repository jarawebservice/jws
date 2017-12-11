var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('estimate', { title: 'Estimate project', content: 'You can estimate your project here ' });
});
router.get('/view/:id', (req, res, next) => {
    res.render('view-estimate', { title: 'Estimate project', content: 'You can estimate your project here ' });
});
router.get('/delete/:id', (req, res, next) => {
    res.render('delete-estimate', { title: 'Estimate project', content: 'You can estimate your project here ' });
});
router.get('/create', (req, res, next) => {
    res.render('create-estimate', { title: 'Estimate project', content: 'You can estimate your project here ' });
});

module.exports = router;