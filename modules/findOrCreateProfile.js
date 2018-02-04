var User = require('../models/user');

var findOrCreateProfile = function(profileDetails, profile, done) {
    var facebook = false;

    if (profileDetails.facebookId) {
        facebook = true;
    }

    User.findOne(profileDetails, function(err, user) {
        if (err || !account) {
            user = new User({
                username: profile.username,
                profile: profile
            });

            if (facebook) {
                user.facebookId = profile.id
            }

            user.save(done);
        } else {
            done(null, account);
        }
    })


}

module.exports = findOrCreateProfile