require('backbone');

module.exports = Backbone.Model.extend({

    /**
     * On initialize.
     * Listen model requests
     */
    initialize : function () {
        this.listenTo(this, 'request', this.startFetching);
        this.listenTo(this, 'sync error', this.stopFetching);
    },


    /**
     * Update flag on request start
     */
    startFetching : function () {
        this.set('fetching', true);
    },


    /**
     * Update flag on request stop
     */
    stopFetching : function () {
        var that = this;
        setTimeout(function () {
            that.set('fetching', false);
        }, 1000);
    },


    /**
     * Get fetching results status
     * @returns {Boolean} results fetching status
     */
    isFetching : function () {
        return this.get('fetching');
    },


    /**
     * Reset model with passed data and/or default values
     * @param [data] {Object}
     */
    reset : function (data) {
        this.clear().set(_.extend(data || {}, this.defaults));
    }
});