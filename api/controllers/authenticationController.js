var AuthenticationAttemptModel = require('../models/authenticationAttempt'),
    AuthenticationAttempt = AuthenticationAttemptModel.getModelInstance(),
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
    console.log(req.body);
    if (req.body.username === undefined) {
        res.status(404).json({
            success: false,
            message: 'Please provide a username and password.'
        });
    } else {
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

                AuthenticationAttemptModel.saveAuthenticationAttempt(
                    req.body.username,
                    req.connection.remoteAddress,
                    authenticated
                );
            }
        );
    }
};
