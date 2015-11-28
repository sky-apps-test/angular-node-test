var jwt = require('jsonwebtoken'),
    app = module.parent.exports.app,
    jwtSecret = app.get('jwtSecret');

var jwtHandler = {
    validateToken: function(req, res, next) {
        var token = req.headers['x-access-token'];

        if (token === undefined) {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }

            req.decoded = decoded;
            next();
        });
    },
    createToken: function (user) {
        return jwt.sign(
            user,
            app.get('superSecret'),
            {
                expiresInMinutes: 1440 // expires in 24 hours
            }
        )
    }
};

exports.validateToken = jwtHandler.validateToken;
exports.createToken = jwtHandler.validateToken;
