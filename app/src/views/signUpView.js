require('backbone.marionette');
require('underscore');
var ItemView = require('../core/itemView');

module.exports = ItemView.extend({

    template: 'register',

    bindings: {
        '#firstName' : 'firstName',
        '#lastName' : 'lastName',
        '#address' : 'address',
        '#email' : 'email',
        '#phone' : 'phone',
        '#saveUserBtn': {
            observe: 'fetching',
            onGet: function (val) {
                return val ? 'saving...' : 'save'
            }
        }
    },

    events: {
        'click #saveUserBtn' : 'saveUserClickHandler'
    },

    initialize: function () {
        _.bindAll(this, 'onUserSuccessSave');
    },

    saveUserClickHandler: function (e) {
        e.preventDefault();
        this.model.isValid() ?
            this.model.save().done(this.onUserSuccessSave):
            this.showErrors(this.model.validationError);
    },

    onUserSuccessSave: function () {
        this.hideErrors();
        //this.model.clear();
    },

    onRender: function () {
        this.stickit();
    }
});