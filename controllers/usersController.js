var User = require('../models/user');

var usersController = {
    getUsers: function () {
        User.find(
            {},
            function(err, users) {
                res.json(users);
            }
        );
    },
    createUsers: function(req, res) {
        var users = ['user', 'manager', 'admin', 'developer', 'tester'];

        for (index in users) {
            var newUser = new User({
                username: users[index],
                password: 'password',
                admin: true
            });

            newUser.save(function(err) {
                if (err) throw err;

                console.log('User saved successfully');
            });
        }

        res.json({ success: true });
    }
};

exports.getUsers = usersController.getUsers;
exports.createUsers = usersController.createUsers;
