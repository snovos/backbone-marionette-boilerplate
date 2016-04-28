require('backbone.marionette');
var CompositeView = require('../core/compositeView');
var ItemView = require('../core/itemView');

var UserView = ItemView.extend({
    template: 'user',
    tagName: 'tr',

    bindings: {
        '[data-first-name]': 'firstName',
        '[data-last-name]': 'lastName',
        '[data-address]': 'address',
        '[data-email]': 'email',
        '[data-phone]': 'phone'
    },

    onRender: function () {
        this.stickit();
    }
});

module.exports = CompositeView.extend({
    template: 'users',
    childView: UserView,
    childViewContainer: '.user-list'
});