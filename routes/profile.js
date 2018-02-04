var express = require('express');
var router = express.Router();


function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
        console.log(req.isAuthenticated())
    }
}
/* GET home page. */
router.get('/', requireAuthentication, function(req, res, next) {
    res.render('profile', { title: 'User Profile | JWS', content: 'Manage your domain here' });
});

module.exports = router;