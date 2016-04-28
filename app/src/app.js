var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    overrides = require('./overrides');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();
    overrides();
    App.core.on("before:start", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};


        // Here you can fetch all needed data or any other pre-init commands:

        App.core.vent.trigger('app:start');
    });


    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });


    App.core.start();
};
