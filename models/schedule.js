const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
    },
    timezone: {
        type: String
    },
    pNumber: {
        type: String
    },
    skypeId: {
        type: String
    },
    message: {
        type: String
    }

});

const Schedule = module.exports = mongoose.model('Schedule', scheduleSchema);

module.exports.getSchedules = function(callback, limit) {
    Schedule.find(callback).limit(limit).sort([
        ['date', 'ascending']
    ]);
}

module.exports.addSchedule = function(schedule, callback) {
    Schedule.create(schedule, callback);
}