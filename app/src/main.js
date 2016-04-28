var Backbone = require('backbone');
var mixins = require('./core/mixins');
var _ = require('underscore');
var App = require('./app');

_.extend(Backbone.View.prototype, mixins);
var myapp = new App();
myapp.start();
