require('backbone.marionette');
var ItemView = require('../core/itemView');

module.exports = ItemView.extend({
    template: 'login',

    events: {
        'click #loginBtn' : 'loginClickBtnHandler'
    },

    loginClickBtnHandler: function () {
        App.router.navigate('users', {trigger:true});
    }
});