require('backbone.marionette')
require('backbone');
require('underscore');
require('jquery');

module.exports = {



    /**
     * Display error alert if some application error occurred.
     * All application errors should be shown using this method.
     * Error will be frozen because user should close it manually
     * @param message {String} message to be displayed
     * @param [xhr] {XMLHttpRequest} failed request
     */
    showError : function (message, xhr) {
      var stamp = xhr && xhr.stamp || '';
      var isTimeout = xhr && xhr.statusText === 'timeout';
      try {
        var error = JSON.parse(xhr.responseText).errorMessage;
        if (error) {
          message = error;
        }
      }
      catch(e) {}
      if (isTimeout) {
        message = app.constants.MESSAGES.CONNECTION_TIMEOUT;
      }
      app.vent.trigger(app.events.APPLICATION_ERROR, message, false, stamp);
    },


    /**
     * Display information alert with passed message
     * @param message {String} message to be displayed
     * @param [freeze] {Boolean} do not close alert
     */
    showInfo : function (message, freeze) {
      app.vent.trigger(app.events.SHOW_ALERT, message, app.constants.ALERT_VIEW.MESSAGE_TYPE.info, freeze);
    },


    /**
     * Display successful alert with passed message
     * @param message {String} message to be displayed
     * @param [freeze] {Boolean} do not close alert
     */
    showSuccess : function (message, freeze) {
      app.vent.trigger(app.events.SHOW_ALERT, message, app.constants.ALERT_VIEW.MESSAGE_TYPE.success, freeze);
    },


    /**
     * Disable native browser behaviour
     * @param e {jQuery} event
     */
    preventDefault : function (e) {
      e.preventDefault();
    },


    /**
     * Stop bubbling
     * @param e {jQuery} event
     */
    stopPropagation : function (e) {
      e.stopPropagation();
    },


    /**
     * Disable native browser behaviour.
     * Stop bubbling
     * @param e {jQuery} event
     */
    stopEvent : function (e) {
      e.preventDefault();
      e.stopPropagation();
    },


  hideErrors: function () {
    this.$('.form-group').removeClass('error');
    this.$('.help-block').addClass('hidden').text('');
  },


  showErrors: function(errors) {
    _.each(errors, function (error) {
      var controlGroup = this.$('.' + error.name);
      controlGroup.addClass('error');
      controlGroup.find('.help-block').removeClass('hidden').text(error.message);
    }, this);
  },



    /**
     * Make delay and execute the callback
     * @param fn {Function} callback
     * @param [context] {Object} callback context
     * @param [duration] {Number} wait duration
     */
    wait : function (fn, context, duration) {
      context || (context = this);
      duration || (duration = 0);
      
      _.delay(function () {
        fn.apply(context);
      }, duration);
    }

  };

