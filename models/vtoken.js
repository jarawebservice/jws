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


const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

const token = module.exports = mongoose.model('token', tokenSchema);