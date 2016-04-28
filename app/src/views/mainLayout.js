var Marionette = require('backbone.marionette'),
    Layout = require('../core/layout');

module.exports = MainLayout = Layout.extend({
    el : '#content',
    template : 'layout',

    regions : {
        mainRegion : '#mainRegion'
    }
});