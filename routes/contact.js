var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// express.locals.description = 'Jaracare helps company achieve the goals using the right technologies as a lever';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'JWS | Contact us', description: 'You can contact us at jws here, we would get back to you as soon as we receive your message' });
});

router.post('/send', urlencodedParser, function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'waleander@gmail.com',
            pass: 'iamborn2win85'
        }
    });

    var mailOptions = {
        from: '"Jara Web Services ?" <waleander@gmail.com>',
        to: 'guva4all@yahoo.com, waleander@gmail.com',
        subject: 'Hello from Jaracare',
        text: 'Jara Web Service has a new message submission from... Name: ' + req.body.name + ' Email: ' + req.body.email + ' message: ' + req.body.message,
        html: '<p>You have a submission from...</p> <ul><li>Name: ' + req.body.name + '</li> <li>Email: ' + req.body.email + '</li> <li>message: ' + req.body.message + '</li></ul>'
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('message sent' + info.response);
        res.redirect('/');
    })
});

module.exports = router;