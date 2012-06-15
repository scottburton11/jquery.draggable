// Draggable
// 
// Makes a DOM element draggable. 
// Copyright 2012 Scott Burton, ChaiOne; all right reserved
// 
//    $(selector).draggable([options], [[callback], ...]);
// 
// Example: 
//
//    $(".box").draggable();
// 
// Options:
// move:  Move the selected element when dragging. Default true.
// debug: Log the event object to the console while dragging. Default false.
// 
// Callbacks:
// Optionally provide one or more callbacks. Callbacks are fired in
// sequence, and take a jQuery event object with some additional attributes
// in the `data` property:
//    draggable:          the selected element
//    offsetX:            the x coordinate offset between the mouse cursor and the left 
//                        edge of the draggable element
//    offsetY:            the y coordinate offset between the mouse cursor and the top 
//                        edge of the draggable element
//    width:              the draggable element's width
//    height:             the draggable element's height
//    offsetParentWidth:  the offset parent's width
//    offsetParentHeight: the offset parent's height
//    top:                the draggable's top coordrinate, taking the bounding parent into account
//    right:              the draggable's right coordrinate, taking the bounding parent into account
//    bottom:             the draggable's bottom coordrinate, taking the bounding parent into account
//    left:               the draggable's left coordrinate, taking the bounding parent into account
// 
(function($) {

  var methods = {

    mousedown: function(e) {
      var $this = $(this);

      // Mouse offset within the draggable element
      var offsetX, offsetY;
      offsetX = e.pageX - e.currentTarget.offsetLeft;
      offsetY = e.pageY - e.currentTarget.offsetTop;

      // Bounding parent offset dimensions
      var offsetParentWidth, offsetParentHeight;
      offsetParentWidth  = e.currentTarget.offsetParent.clientWidth;
      offsetParentHeight = e.currentTarget.offsetParent.clientHeight;

      // Draggable element dimensions
      var width, height;
      width  = e.currentTarget.clientWidth;
      height = e.currentTarget.clientHeight;

      var eventData = {draggable: $this, offsetX: offsetX, offsetY: offsetY, width: width, height: height, offsetParentWidth: offsetParentWidth, offsetParentHeight: offsetParentHeight};

      $(window).one("mouseup.draggable", function(e){
        $(window).off("mousemove.draggable", privateMethods.mouseMove);
      });

      $(window).on("mousemove.draggable", eventData, privateMethods.mouseMove);
    }
  };

  var privateMethods = {
    mouseMove: function(event) {
      var $this = event.data.draggable;

      // Coordinates of the draggable element, taking into account the bounding parent element
      var top, right, bottom, left;
      left   = Math.min(event.data.offsetParentWidth  - event.data.width,  Math.max(0, event.pageX - event.data.offsetX));
      top    = Math.min(event.data.offsetParentHeight - event.data.height, Math.max(0, event.pageY - event.data.offsetY));
      right  = left + event.data.width;
      bottom = top  + event.data.height;

      event.data.top    = top;
      event.data.right  = right;
      event.data.bottom = bottom;
      event.data.left   = left;

      var data = $this.data("draggable");
      data.callbacks.fire(event);
    },

    moveElement: function(event) {
      $this = event.data.draggable;
      $this.css({left: event.data.left, top: event.data.top});
    }
  }        

  $.fn.draggable = function(options) {
  
    if (!this.length) { return this; }

    var args = Array.prototype.slice.call(arguments);
    var callbacks;

    if (typeof(args[0]) === "function") {
      options = {};
      callbacks = args;
    } else {
      options = args.shift();
      callbacks = args;
    }

    var opts = $.extend(true, {}, $.fn.draggable.defaults, options);

    var setUnselectable = function(){
      // Prevent selection of this element while dragging in Firefox
      if (typeof this.style.MozUserSelect !== "undefined") {
        originalSelectionValue = this.style.MozUserSelect;
        this.style.MozUserSelect = "none";
      }

      // Prevent selection of this element while dragging in IE
      if (typeof this.onselectstart !== "undefined") {
        originalSelectionValue = this.onselectstart;
        this.onselectstart = function(){
          return false;
        }
      }
    }

    var debug = function(event) {
      console.log(event);
    };

    this.each(function() {
      var $this = $(this);

      var data = $this.data("draggable");

      if (!data) {
        $this.data("draggable", {
          callbacks: $.Callbacks()
        });
        var data = $this.data("draggable");
      }

      if (opts.move) {
        data.callbacks.add(privateMethods.moveElement);
      }

      if (typeof callbacks !== "undefined") {
        $.each(callbacks, function(){
          data.callbacks.add(this);
        });
      }

      $this.on("mousedown.draggable", methods.mousedown)

    });

    this.each(setUnselectable);

    return this;
  };
  
  // default options
  $.fn.draggable.defaults = {
    move: true,
    debug: false
  };

})(jQuery);