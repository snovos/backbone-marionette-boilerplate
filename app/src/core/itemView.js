  require('jquery');
  require('underscore');
  require('backbone.marionette');

  module.exports = Marionette.ItemView.extend({

    /**
     * @override
     * @constructor
     * Override Marionette.ItemView constructor.
     * Execute method to bind all defined methods
     */
    constructor : function () {
      this.bindAllDefinedMethods();
      Marionette.ItemView.prototype.constructor.apply(this, arguments);
    },


    /**
     * Look for `bindAll` array and bind all methods inside it
     */
    bindAllDefinedMethods : function () {
      if (_.isArray(this.bindAll)) {
        _.bindAll.apply(_, [this].concat(this.bindAll || []));
      }
    },


    /**
     * On initialize
     * @param options {Object} initialization options
     */
    initialize : function (options) {
      _.extend(this, options);
    },


    /**
     * Convert the value of the first argument to boolean and reverse it
     * @param value {*} any value
     * @returns {Boolean} reversed value
     */
    reverseFirstArgument : function (value) {
      return !value;
    }

  });

