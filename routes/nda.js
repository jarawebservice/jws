var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});
router.post('upload', function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.nda;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/uploads/nda', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});
router.get('create', function(req, res, next) {
    res.render('create-nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});
router.get('delete/:id', function(req, res, next) {
    res.render('delete-nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});

module.exports = router;