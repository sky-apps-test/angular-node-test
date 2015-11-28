var User = require('../models/user'),
    jwtService = require('../services/jwtService');

exports.authenticate = function(req, res){
    User.findOne(
        {
            username: req.body.username.toLowerCase()
        },
        function(err, user) {
            if (err) throw err;

            if (user === null) {
                return res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            }

            if (user.password !== req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                var token = jwtService.createToken();

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    );
};
