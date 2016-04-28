var Marionette = require('backbone.marionette'),
    _ = require('underscore');

module.exports = Marionette.LayoutView.extend({

    /**
     * @constructor
     * @param options {Object} initialization options
     */
    initialize: function (options) {
        _.extend(this, options);
    },


    /**
     * Just clean element instead of deleting it
     * @returns {Backbone.Marionette.Layout}
     */
    remove: function () {
        this.stopListening();
        this.$el.empty();
        return this;
    }

});
