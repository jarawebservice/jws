var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.render('admin-login', { title: 'Admin Login', content: ' Admin login here ' });
// });

router.get('/', (req, res, next) => {
    res.render('admin', { title: 'Admin Area', content: 'you can manage your website here ' });
});