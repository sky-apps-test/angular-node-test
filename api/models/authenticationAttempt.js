var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AuthenticationAttempt = mongoose.model(
        'AuthenticationAttempt',
        new Schema({
            ip: String,
            datetime: { type: Date, default: Date.now },
            action: String,
            username: String
        })
    );

module.exports.getModelInstance = function () {
    return AuthenticationAttempt;
}

module.exports.saveAuthenticationAttempt = function (username, ip, status) {
    var newAuthenticationAttempt = new AuthenticationAttempt({
        ip: ip,
        action: status ? 'AUTH_SUCCESS' : 'AUTH_FAILURE',
        username: username
    });

    newAuthenticationAttempt.save(function(err) {
        if (err) throw err;

        console.log('Authentication saved');
    });
};
