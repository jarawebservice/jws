var express = require('express');
var router = express.Router();

Schedule = require('../models/schedule.js');

/* GET home page. */
router.get('/', (req, res, next) => {
    Schedule.getSchedules((err, schedules) => {
        if (err) {
            res.log(err);
        }

        res.render('schedule', {
            title: 'Schedule',
            schedules: schedules,
            description: 'We would like to have a talk with you to see how we can move your organisation forward'
        });
    });


    // res.render("schedule");
});

router.get('/view/:_id', (req, res, next) => {
    res.render('schedule', {
        title: 'Schedule',
        description: 'We would like to have a talk with you to see how we can move your organisation forward'
    });

    // res.render("schedule");
});

router.get('/add', (req, res, next) => {
    res.render('add_schedule', {
        title: 'Add Schedule',
        description: 'Add a schedule here'
    });

    // res.render("schedule");
});



router.post('/add', function(req, res, next) {
    req.checkBody('fullname', 'fullname is required').notEmpty();
    req.checkBody('date', 'date is required').notEmpty();
    req.checkBody('time', 'time is required').notEmpty();
    req.checkBody('timezone', 'timezone is required').notEmpty();
    req.checkBody('contactNumber', 'Number is required').notEmpty();
    req.checkBody('skypeId', 'SkypeId is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.render('add_schedule', {
            errors: errors,
            title: 'Create schedule'
        });
    } else {
        let schedule = new Schedule();

        schedule.fullname = req.body.fullname;
        schedule.email = req.body.email;
        schedule.date = req.body.date;
        schedule.timezone = req.body.timezone;
        schedule.pNumber = req.body.phone;
        schedule.skypeId = req.body.skypeid;
        schedule.message = req.body.message;

        Schedule.addSchedule(schedule, (error, schedule) => {
            if (error) {
                res.send(error);
                console.log('error detected');
            }
            res.send("you message is sent, we shall get back shortly");
        });
    }
});




// router.post('/delete/:id', function(req, res, next) {
//     Schedule.getSchedules((err, schedules) => {
//         console.log(schedules);
//     })
//     res.render('schedule-meeting', { title: 'You can see our schedule to book a meeting with us', content: 'We would like to have a talk with you to see how we can move your organisation forward  ' });
// });

module.exports = router;