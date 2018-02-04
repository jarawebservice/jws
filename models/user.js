const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
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

// User Schema
const UserSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    date: {
        type: { type: Date, default: Date.now },
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    billing: [{
        date: Date,
        bill: { type: Schema.Types.ObjectId, ref: '' }
    }]
});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return next(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

UserSchema.pre('save', (next) => {
    var user = this;
    if (!user.isModified('password')) return next();
    bycrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports.checkIfUserIsAdmin = function(name) {
    return getUserByUsername(name).isAdmin
}