jQuery Draggable
================
Makes a DOM element draggable. 

   $(selector).draggable([options], [[callback], ...]);

Usage
-----

   $(".box").draggable();

Options
-------

    move:  Move the selected element when dragging. Default true.
    debug: Log the event object to the console while dragging. Default false.
 
Callbacks
---------
Optionally provide one or more callbacks. Callbacks are fired in
sequence, and take a jQuery event object with some additional
attributes in the `data` property:

    draggable:          the selected element
    offsetX:            the x coordinate offset between the mouse cursor and the left 
                        edge of the draggable element
    offsetY:            the y coordinate offset between the mouse cursor and the top 
                        edge of the draggable element
    width:              the draggable element's width
    height:             the draggable element's height
    offsetParentWidth:  the offset parent's width
    offsetParentHeight: the offset parent's height
    top:                the draggable's top coordrinate, taking the bounding parent into account
    right:              the draggable's right coordrinate, taking the bounding parent into account
    bottom:             the draggable's bottom coordrinate, taking the bounding parent into account
    left:               the draggable's left coordrinate, taking the bounding parent into account

Copyright
---------
Copyright 2012 Scott Burton, ChaiOne; all right reserved
