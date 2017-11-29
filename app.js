var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var unirest = require('unirest');

var index = require('./routes/index');
var webAuthoring = require('./routes/web-authoring');
var domainSearch = require('./routes/search-domain');
var users = require('./routes/users');
var web = require('./routes/web');
var webAnime = require('./routes/web-animation');
var videoCon = require('./routes/video-conferencing');
var socialMarketing = require('./routes/social-marketing');
var webHost = require('./routes/web-hosting');
var ws = require('./routes/web-services');
var ecat = require('./routes/ecatalog');
var api = require('./routes/api');
var mobile = require('./routes/mobile');
var seo = require('./routes/seo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 3000));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/', index);
app.use('/web-authoring', webAuthoring);
app.use('/domain-search', domainSearch);
app.use('/users', users);
app.use('/mobile', mobile);
app.use('/seo', seo);
app.use('/video-conferencing', videoCon);
app.use('/social-marketing', socialMarketing);
app.use('/web-animation', webAnime);
app.use('/web-hosting', webHost);
app.use('/web-services', ws);
app.use('/web', web);
app.use('/ecatalog', ecat);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), function() {
    console.log("App started on port" + app.get('port'));
});