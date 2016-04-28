var User = require('../model').User;

module.exports = {
    index: function(req, res) {
        User.find({}, function(err, data) {
            res.json(data);
        });
    },
    add: function(req, res) {
        var newUser = new User(req.body);
        newUser.save(function(err, contact) {
            if (err) {
                res.json({error: 'Error adding contact.'});
            } else {
                res.json(contact);
            }
        });
    },

    delete: function(req, res) {
        res.json(200, {status: 'Success'}, {msg:'User has been deleted'});
    }
};
