const mongoose = require('mongoose');
// var uristring =
//     process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/HelloMongoose';
mongoose.connect('mongodb://jara:jaracare@ds161306.mlab.com:61306/jws', { useMongoClient: true });

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
    message: {
        type: String
    }

});

const Nda = module.exports = mongoose.model('Nda', scheduleSchema);

module.exports.getNdas = function(callback, limit) {
    Nda.find(callback).limit(limit).sort([
        ['date', 'ascending']
    ]);
}

module.exports.addNda = function(nda, callback) {
    Nda.create(nda, callback);
}

module.exports.deleteNda = function(nda, callback) {
    Nda.remove(nda, callback);
}

moudle.exports.updateNda = function(nda, callback) {
    Nda.update(nda, callback);
}