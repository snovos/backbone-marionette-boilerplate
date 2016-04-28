var Marionette = require('backbone.marionette');
module.exports = function () {


  /**
   * Fetch templates from cache or via XHR request
   *
   * @param name {String|Function}
   * Path to template e.g. `dir/[/dir[/dir...]]filename`
   * Or template function e.g. `_.template('<div></div>')`
   *
   * If name starts from the `core!` we have to trim it and
   * look for template in the `core` folder
   *
   * @returns {Function} precompiled underscore template
   */
  Marionette.TemplateCache.prototype.fetchTemplate = function (name) {
    if (_.isFunction(name)) {
      return name;
    }
    var root = './app/';
    var path = 'templates/' + name;

    if (name.indexOf('component!') === 0) {
      var split = name.replace(/^component!/, '').split(',');
      var component = split[0].trim();
      var fileName = split[1].trim();
      root += 'src/';
      path = 'components/' + component + '/templates/' + fileName;
    }
    var template = window.JST && window.JST[path];
    if (template == null) {
      $.ajax({url: root + path + '.html', async: false}).then(function (contents) {
        template = contents;
      });
    }
    return _.template(template);
  };


  /**
   * Override loadTemplate method
   * @param templateId {String} template id
   * @returns {Function} precompiled underscore template
   */
  Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
    return this.fetchTemplate(templateId);
  };

  Marionette.Region.prototype.show = function(view){
    this._ensureElement();
    view.render();

    this.close(function() {
      if (this.currentView && this.currentView !== view) { return; }
      this.currentView = view;

      this.open(view, function(){
        if (view.onShow){view.onShow();}
        view.trigger("show");

        if (this.onShow) { this.onShow(view); }
        this.trigger("view:show", view);
      });
    });

  };

  Marionette.Region.prototype.close = function(cb){
    var view = this.currentView;
    delete this.currentView;

    if (!view){
      if (cb){ cb.call(this); }
      return;
    }

    var that = this;
    view.$el.slideUp(function(){
      if (view.close) { view.close(); }
      that.trigger("view:closed", view);
      if (cb){ cb.call(that); }
    });

  };

  Marionette.Region.prototype.open = function(view, callback){
    var that = this;
    this.$el.html(view.$el.hide());
    view.$el.slideDown(function(){
      callback.call(that);
    });
  };

  /**
   * Override compileTemplate method
   * grunt-contrib-jst task will already generate compiled template
   * @param template {Function} precompiled underscore template
   * @returns {Function} precompiled underscore template
   */
  Marionette.TemplateCache.prototype.compileTemplate = function (template) {
    return template;
  };
}
