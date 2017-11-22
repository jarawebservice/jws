var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 3000));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

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

+

function($) {
    $(document).on('ready', function(e) {
        var $searchOverlay = $('.body-overlay'),
            $searchTrigger = $('#search-trigger'),
            $search = $('#search-overlay-form input[type="search"]');


        $(".basket-trigger").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).next('.basket-content').toggleClass('open-basket');
        });

        $('.mobile-toggle').click(function(e) {
            e.preventDefault();
            $('#header-nav nav').toggleClass('open-nav');
        });

        $searchTrigger.click(function(e) {
            $searchOverlay.fadeIn(500);
            $search.focus();
        });

        $('#spanHover').click(function(e) {
            $searchOverlay.fadeIn(500);
            $search.focus();
        });

        $searchOverlay.find('.fa-times').click(function(e) {
            $searchOverlay.fadeOut(500);
        });

        $('.search-trigger')

        $(window).scroll(function() {
            if ($(window).scrollTop() > 20) {
                $("body").addClass("scrolled");
            } else {
                $("body").removeClass("scrolled");
            }
        });
    })
}(jQuery);

module.exports = app;