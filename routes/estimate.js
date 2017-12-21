var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Estimate = require('../models/estimate.js');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('estimate', { title: 'Estimate project', content: 'You can estimate your project here ' });
});

router.post('/send', (req, res, next) => {
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('phone', 'Phone number is required').notEmpty();
    req.checkBody('companyName', 'Company name is required').notEmpty();
    req.checkBody('ctype', 'company type is required').notEmpty();
    req.checkBody('services', 'project type is required').notEmpty();
    req.checkBody('from', 'Choose a prize range').notEmpty();
    req.checkBody('to', 'choose a prize range').notEmpty();
    req.checkBody('message', 'add a short message please').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('estimate', {
            errors: errors,
            title: 'Create estimate'
        });
    } else {
        let estimate = new Estimate();
        estimate.firstName = req.body.firstName;
        estimate.lastName = req.body.lastName;
        estimate.email = req.body.email;
        estimate.phone = req.body.phone;
        estimate.companyName = req.body.companyName;
        estimate.from = req.body.from;
        estimate.to = req.body.to;
        estimate.message = req.body.message;
        estimate.ctype = req.body.ctype;
        estimate.services = req.body.services;



        Estimate.addEstimate(estimate, (error, estimate) => {
            if (error) {
                res.send(error);
                console.log('error detected');
            }
            res.send("You Estimate has been sent, we shall get back shortly");
        });
    }
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