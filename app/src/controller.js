var Marionette = require('backbone.marionette'),
    MainLayout = require('./views/mainLayout'),
    LoginView = require('./views/loginView'),
    SignUpView = require('./views/signUpView'),
    UserModel = require('./models/userModel'),
    UsersCollection = require('./collections/usersCollection'),
    UsersView = require('./views/usersView');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        this.mainLayout = new MainLayout();
        this.mainLayout.render();
    },

    login: function() {
        App.core.vent.trigger('app:log', 'Controller: "Login" route hit.');
        var view = App.views.loginView = new LoginView();
        this.renderView(view);
    },

    signUp: function() {
        App.core.vent.trigger('app:log', 'Controller: "Sign Up" route hit.');
        var userModel = new UserModel();
        var view = App.views.signUpView = new SignUpView({model:userModel});
        this.renderView(view);
    },

    users: function() {
        var usersCollection = new UsersCollection();
        var usersView = new UsersView({collection:usersCollection});
        var that = this;
        usersCollection.fetch()
            .done(function () {
                that.renderView(usersView);
            })
    },

    renderView: function(view) {
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        this.mainLayout.mainRegion.show(view);
    }

});
