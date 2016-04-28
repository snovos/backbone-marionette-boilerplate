require('backbone');
var Model = require('../core/model');

module.exports = Model.extend({
    url :'api/users',

    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: ''
    },

    validate: function (attrs) {
        var errors = [];
        if (!attrs.firstName) {
            errors.push({name: 'firstName', message: 'Please fill First Name field.'});
        }
        if (!attrs.lastName) {
            errors.push({name: 'lastName', message: 'Please fill Last Name field.'});
        }

        return errors.length > 0 ? errors : false;
    }
});
