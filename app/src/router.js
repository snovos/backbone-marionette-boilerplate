var Controller = require('./controller');
require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'login',
        'register' : 'signUp',
        'users' : 'users'
    },

    controller: Controller
});
