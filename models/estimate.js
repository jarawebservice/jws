const mongoose = require('mongoose');
// var uristring =
//     process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/HelloMongoose';
mongoose.connect('mongodb://jara:jaracare@ds161306.mlab.com:61306/jws', { useMongoClient: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
const ObjectId = mongoose.Types.ObjectId;

const estimateSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    companyName: {
        type: String
    },
    ctype: {
        type: Array
    },
    services: {
        type: String
    },
    from: {
        type: Number
    },
    to: {
        type: Number
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },


});

const Estimate = module.exports = mongoose.model('Estimate', estimateSchema);

module.exports.estimates = function(callback, limit) {
    Estimate.find(callback).limit(limit).sort([
        ['date', 'ascending']
    ]);
}

module.exports.addEstimate = function(estimate, callback) {
    Estimate.create(estimate, callback);
}

module.exports.deleteEstimate = function(estimate, callback) {
    Estimate.remove(estimate, callback);
}

module.exports.updateEstimate = function(estimate, callback) {
    Estimate.update(estimate, callback);
}