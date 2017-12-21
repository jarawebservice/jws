const mongoose = require('mongoose');
// var uristring =
//     process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/HelloMongoose';
mongoose.connect('mongodb://localhost:27017/jws', { useMongoClient: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
// mongoose.connect('mongodb://localhost/jws');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;

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
    timezone: {
        type: String
    },
    phone: {
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

module.exports.deleteSchedule = function(schedule, callback) {
    Schedule.remove(schedule, callback);
}

module.exports.updateSchedule = function(schedule, callback) {
    Schedule.update(schedule, callback);
}