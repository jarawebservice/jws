var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();



var app = express();
// app.use(formidable({
//     maxFieldsSize: 2 * 1024 * 1024,
//     encoding: 'utf-8',
//     uploadDir: '/public/nda',
//     keepExtensions: true
//         // multiples: true, // req.files to be arrays of files 
// }));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});

router.post('/send', function(req, res) {
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

router.get('create', function(req, res, next) {
    res.render('create-nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});
router.get('delete/:id', function(req, res, next) {
    res.render('delete-nda', { title: 'NDA', content: 'Your non-disclosure aggreement might be all that week set off the project  ' });
});

module.exports = router;