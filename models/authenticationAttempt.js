var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model(
    'AuthenticationAttempt',
    new Schema({
        ip: String,
        datetime: { type: Date, default: Date.now },
        action: String,
        username: String
    })
);
