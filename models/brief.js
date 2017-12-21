const mongoose = require('mongoose');
// var uristring =
//     process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/HelloMongoose';
mongoose.connect('mongodb://jara:jaracare@ds161306.mlab.com:61306/jws', { useMongoClient: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
// mongoose.connect('mongodb://localhost/jws');
const ObjectId = mongoose.Types.ObjectId;

const briefSchema = mongoose.Schema({
    companyName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    companyName: {
        type: String
    },
    address: {
        type: String
    },
    brief: {
        type: String
    }

});

const Brief = module.exports = mongoose.model('Brief', briefSchema);

module.exports.getBriefs = function(callback, limit) {
    Brief.find(callback).limit(limit).sort([
        ['date', 'ascending']
    ]);
}

module.exports.addBrief = function(brief, callback) {
    Brief.create(brief, callback);
}

module.exports.deleteBriefs = function(brief, callback) {
    Brief.remove(brief, callback);
}

module.exports.updateBriefs = function(brief, callback) {
    Brief.update(brief, callback);
}