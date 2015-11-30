(function () {
    'use strict';

    var jwt = require('jsonwebtoken'),
        config = require('../config/config'),
        decodedToken = {},
        accessToken = '';

    var jwtHandler = {
        setAccessToken: function (token) {
            accessToken = token;
        },
        getAccessToken: function () {
            return accessToken;
        },
        setDecodedToken: function (token) {
            decodedToken = token;
        },
        getDecodedToken: function () {
            return decodedToken;
        },
        validateToken: function(req, res, next) {
            var that = this,
                token = req.headers['x-access-token'];

            if (token === undefined) {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }

            jwt.verify(token, config.JWTSecret, function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }

                jwtHandler.setDecodedToken(decoded);

                req.decoded = decoded;
                next();
            });
        },
        createToken: function (username, ip) {
            return jwt.sign(
                {
                    username: username,
                    ip: ip
                },
                config.JWTSecret,
                {
                    expiresIn: 1440
                }
            )
        }
    };

    exports.validateToken = jwtHandler.validateToken;
    exports.createToken = jwtHandler.createToken;
    exports.getDecodedToken = jwtHandler.getDecodedToken;
    exports.setAccessToken = jwtHandler.setAccessToken;
    exports.getAccessToken = jwtHandler.getAccessToken;
})();
