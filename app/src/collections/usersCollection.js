var Backbone = require('backbone'),
    UserModel = require('../models/userModel');

module.exports = ContactsCollection = Backbone.Collection.extend({
    url: '/api/users',
    model: UserModel
});
