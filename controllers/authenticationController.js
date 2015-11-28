var AuthenticationAttempt = require('../models/authenticationAttempt'),
    User = require('../models/user'),
    jwtService = require('../services/jwtService');

exports.getAuthenticationAttempts = function (req, res) {
    AuthenticationAttempt.find(
        {},
        function(err, authenticationAttempts) {
            return res.json(authenticationAttempts);
        }
    );
};

exports.authenticate = function(req, res){
    console.log(req.body.username.toLowerCase());

    User.findOne(
        {
            username: req.body.username.toLowerCase()
        },
        function(err, user) {
            if (err) throw err;

            var authenticated = false;

            if (user === null) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user.password !== req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                var token = jwtService.createToken(
                    user.username,
                    req.connection.remoteAddress
                );

                authenticated = true;

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

            var newAuthenticationAttempt = new AuthenticationAttempt({
                ip: req.connection.remoteAddress,
                action: authenticated ? 'AUTH_SUCCESS' : 'AUTH_FAILURE',
                username: req.body.username
            });

            newAuthenticationAttempt.save(function(err) {
                if (err) throw err;

                console.log('Authentication saved');
            });
        }
    );
};
