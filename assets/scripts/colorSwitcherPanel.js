var ColorSwitcherPanel = {

  switcherObject           : false,
  currentColorType         : 'light',
  currentColorToggleObject : false,
  container                : false,

  Init : function(options) {
    if(typeof options.switcherObject == "undefined") {
      alert('Template Color Switcher Panel - No Switcher Object Provided');
      return;
    }

    if(typeof options.container == "undefined") {
      alert('Template Color Switcher Panel - No Container Provided');
      return;
    }

    this.container     = options.container;
    this.switcherObject = options.switcherObject;

    this._setColorToggleEvents();
    this._setPanelToggle();
  },

  _setPanelToggle : function() {
    var objectInstance = this,
        panelObject    = this.container.find('> .container-panel'),
        settingsObject = this.container.find('> .settings');

    this.container.find('.togglePanel').bind('click', function(){
      if(panelObject.is(':hidden')) {
        panelObject.show().animate({
          'width' : '100px'
        });
        settingsObject.animate({
          'margin-left' : '130px'
        });
      } else {
        panelObject.animate({
          'width' : '0'
        }, 'slow', function(){
          panelObject.hide();
        });
        settingsObject.animate({
          'margin-left' : '0'
        });
      }
    });
  },

  _setColorToggleEvents : function() {
    var objectInstance = this;

    this.container.find('.colorToggle').bind('click', function(){
      objectInstance.currentColorToggleObject = $(this);
      objectInstance.RunCurrentColor();
    });

    this.container.find('.colorVersionToggle').bind('click', function(){
      objectInstance.currentColorType = $(this).attr('data-color-type');
      objectInstance.RunCurrentColor();
    });

  },

  RunCurrentColor : function() {
    if(this.currentColorToggleObject == false) {
      this.switcherObject._log('Template Color Switcher Panel - No Color Toggle Object Provided');
      return;
    }

    this.switcherObject.SetGlobalColor(this.currentColorToggleObject.attr('data-' + this.currentColorType + '-color'));
  }

};