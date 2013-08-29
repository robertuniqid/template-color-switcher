var TemplateColorSwitcher = {

  elementListObject            : {},
  elementDefaultValueDataPrefix: 'data-template-color-switcher-default-',
  effectedCSSAttributes        : 'data-template-color-switcher-css-attributes',
  templateColorIndicatorPrefix : 'template-based-element-',

  options : {
    transition_duration : 1000
  },

  Init : function(options) {
    if(typeof options == "object")
      this.options = $.extend({}, this.options, options);

    this._setElementListObject();
    this._setElementHelperDataTag();
  },

  _setElementListObject : function() {
    this.elementListObject  = $('[class^=' + this.templateColorIndicatorPrefix + ']');
  },

  _setElementHelperDataTag : function() {
    var objectInstance = this;

    this.elementListObject.each(function(){
      var currentListObject  = $(this),
          classListArray     = currentListObject.attr('class').split(/\s+/),
          effectedAttributes = [];

      $.each(classListArray, function(index, elementClass){
        if(elementClass.indexOf(objectInstance.templateColorIndicatorPrefix) == 0)
          effectedAttributes[effectedAttributes.length] = elementClass.substr(objectInstance.templateColorIndicatorPrefix.length);
      });

      $.each(effectedAttributes, function(index, cssAttributeName){
        currentListObject.attr(objectInstance.elementDefaultValueDataPrefix + cssAttributeName, currentListObject.css(cssAttributeName));
      });

      currentListObject.attr(objectInstance.effectedCSSAttributes, effectedAttributes.join(' '));
    });
  },

  SetGlobalColor : function(color) {
    var objectInstance = this;

    this.elementListObject.each(function(){
      if(typeof $(this).attr(objectInstance.effectedCSSAttributes) != "undefined") {
        var currentListObject      = $(this),
            effectedAttributesList = currentListObject.attr(objectInstance.effectedCSSAttributes).split(' ');

        $.each(effectedAttributesList, function(index, effectedAttribute){
          objectInstance.ChangeElementColor(currentListObject, effectedAttribute, color);
        });
      } else {
        objectInstance._log('Template Color Switcher - Reset Color Failed, plugin was not initialized for this element');
      }
    });
  },

  ResetColor  : function() {
    var objectInstance = this;

    this.elementListObject.each(function(){
      if(typeof $(this).attr(objectInstance.effectedCSSAttributes) != "undefined") {
        var currentListObject      = $(this),
            effectedAttributesList = currentListObject.attr(objectInstance.effectedCSSAttributes).split(' ');

        $.each(effectedAttributesList, function(index, effectedAttribute){
          if(typeof currentListObject.attr(objectInstance.elementDefaultValueDataPrefix + effectedAttribute) != "undefined")
            objectInstance.ChangeElementColor(currentListObject, effectedAttribute, currentListObject.attr(objectInstance.elementDefaultValueDataPrefix + effectedAttribute));
        });
      } else {
        objectInstance._log('Template Color Switcher - Reset Color Failed, plugin was not initialized for this element');
      }
    });
  },

  ChangeElementColor : function(listObject, cssAttribute, color) {
    listObject.css('-webkit-transition', cssAttribute + ' ' + this.options.transition_duration + 'ms linear')
              .css('-moz-transition', cssAttribute + ' ' + this.options.transition_duration + 'ms linear')
              .css('-o-transition', cssAttribute + ' ' + this.options.transition_duration + 'ms linear')
              .css('-ms-transition', cssAttribute + ' ' + this.options.transition_duration + 'ms linear')
              .css('transition', cssAttribute + ' ' + this.options.transition_duration + 'ms linear')
              .css(cssAttribute, color);
  },

  _log : function(message) {
    if(typeof console.log != "undefined")
      console.log(message);
  }

};