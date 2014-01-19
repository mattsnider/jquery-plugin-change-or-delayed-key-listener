============================================
jquery-plugin-change-or-delayed-key-listener
============================================

A jQuery plugin that adds two event listeners to an element. On is a change event listener and the other is a key event (``keydown`` by default). Whilst, the change event executes the callback instantly, the key event will be delayed by a few milliseconds (``500`` by default) before executing the callback. This allows developers to trigger an action on input elements when the user changes the element or as they type, but without overwhelming the user or the system with too many events.

$.fn.changeOrDelayedKey(fn)
===========================

This the basic way to add a callback function for the listener.

$.fn.changeOrDelayedKey(fn, 400, 'keyup')
=========================================

Here we assign the callback function, whilst changing the timeout for delay and the key event to ``keyup``.

$.fn.changeOrDelayedKey({}, fn, 400, 'keyup')
=============================================

Here we add an object to be passed through to the callback function.

License
=======

http://opensource.org/licenses/MIT