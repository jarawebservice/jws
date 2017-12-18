const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    flash = require('express-flash'),
    unirest = require('unirest'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload'),
    passport = require('passport'),
    Strategy = require('passport-facebook').Strategy;
const app = express();
app.use(cookieParser('secret'));

app.use(session({ cookie: { maxAge: 60000 } }));

app.use(flash());

mongoose.connect('mongodb://localhost:27017/jws', { useMongoClient: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', (process.env.PORT || 3000));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

//Express flash
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Messages
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(fileUpload());

// Express Validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }

}));




// Routes
const index = require('./routes/index'),
    webAuthoring = require('./routes/web-authoring'),
    domainSearch = require('./routes/search-domain'),
    users = require('./routes/users'),
    web = require('./routes/web'),
    webAnime = require('./routes/web-animation'),
    videoCon = require('./routes/video-conferencing'),
    socialMarketing = require('./routes/social-marketing'),
    webHost = require('./routes/web-hosting'),
    ws = require('./routes/web-services'),
    ecat = require('./routes/ecatalog'),
    api = require('./routes/api'),
    mobile = require('./routes/mobile'),
    telephony = require('./routes/telephony'),
    softdev = require('./routes/software-development'),
    seo = require('./routes/seo'),
    contact = require('./routes/contact'),
    estimate = require('./routes/estimate'),
    brief = require('./routes/brief'),
    schedule = require('./routes/schedule'),
    nda = require('./routes/nda'),
    register = require('./routes/register'),
    login = require('./routes/login'),
    team = require('./routes/our-team'),
    who = require('./routes/who-we-are'),
    portfolio = require('./routes/portfolio'),
    culture = require('./routes/culture'),
    what = require('./routes/what-we-do'),
    caseStudy = require('./routes/case-study'),
    faqs = require('./routes/faqs'),
    admin = require('./routes/admin'),
    profile = require('./routes/profile'),
    domain = require('./routes/domain-web-hosting');



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
app.use('/contact', contact);
app.use('/estimate', estimate);
app.use('/briefs', brief);
app.use('/software-development', softdev);
app.use('/telephony', telephony);
app.use('/nda', nda);
app.use('/schedule', schedule);
app.use('/register', register);
app.use('/login', login);
app.use('/team', team);
app.use('/who-we-are', who);
app.use('/what-we-do', what);
app.use('/portfolio', portfolio);
app.use('/culture', culture);
app.use('/faqs', faqs);
app.use('/case-study', caseStudy);
app.use('/domain-web-hosting', domain);
app.use('/admin', admin);
app.use('/profile', profile);







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

app.listen(app.get('port'), () => {
    console.log("App started on port" + app.get('port'));
});