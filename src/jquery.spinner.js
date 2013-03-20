(function($) {
  var defaults = {
    image: 'img/loading.gif',
    position: 'before',
    className: 'spinner',

    create: function() {
      var image = document.createElement('img');
      image.src = this.image;

      this.created(image);
    },
    created: function(element) {
      element.className = this.className;
      this._spinner = element;

      if (this.onCreate) {
        this.onCreate(this);
      }
    },
    hide: function(element) {
      if (!this._spinner) {
        return;
      }
      this._spinner.remove();
    },
    show: function(element) {
      this.create();
      if (this.position == 'before') {
        element.before(this._spinner);
      } else if (this.position == 'after') {
        element.after(this._spinner);
      }
    },
    set: function(element) {
      this.hide();
      this.show(element);
      var me = this;

      element.on('spinner:hide', function() {
        me.hide();
      });
    }
  };

  $.setSpinnerDefaults = function(options) {
    $.extend(defaults, options);
  };

  $.fn.hideSpinner = function() {
    return this.trigger('spinner:hide');
  };

  $.fn.submitSpinner = function(options) {
    var _options = $.extend({}, defaults, {
      target: 'input[type=submit]'
    }, options);

    return this.submit(function() {
      var element = $(this).find(_options.target);

      $(this).on('spinner:hide', function() {
        _options.hide();
      });
      _options.set(element);
    });
  };

  $.fn.customSpinner = function(callback, options) {
    var _options = $.extend({}, defaults, options);

    return this.each(function(_, element) {
      callback.apply(element, [_options]);
    });
  };

  $.fn.clickSpinner = function(options) {
    var _options = $.extend({}, defaults, options);

    return this.click(function() {
      _options.set($(this));
    });
  };

})(jQuery);
