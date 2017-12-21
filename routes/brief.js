var express = require('express');
var router = express.Router();


Brief = require('../models/brief.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('brief', { title: 'briefs', content: 'This area contains all the briefs' });
});

router.post('/add', (req, res, next) => {
    req.checkBody('companyName', 'company is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('phone', 'Phone Number is required').notEmpty();
    req.checkBody('brief', 'You must type a brief').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.render('add-brief', {
            errors: errors,
            title: 'Create brief'
        });
    } else {
        let brief = new Brief();

        brief.companyName = req.body.companyName;
        brief.email = req.body.email;
        brief.address = req.body.address;
        brief.phone = req.body.phone;
        brief.brief = req.body.brief;

        Brief.addBrief(brief, (error, brief) => {
            if (error) {
                res.send(error);
                console.log('error detected');
            }
            res.send("We have been briefed, we shall get back shortly");
        });
        // res.render('brief', { title: 'Add brief', content: 'Add a brief here' });
    }
});
router.get('/get-brief/:id', function(req, res, next) {
    res.render('get-brief', { title: 'get brief', content: 'get a brief here' });
});
router.get('/delete-brief/:id', function(req, res, next) {
    res.render('delete-brief', { title: 'Delete brief', content: 'delete a brief here' });
});

module.exports = router;