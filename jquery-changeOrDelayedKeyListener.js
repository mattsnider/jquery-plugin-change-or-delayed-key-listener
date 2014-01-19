(function ($) {
  /**
   * Bind an event handler to the "change" and "key*" JavaScript event.
   * The "key*" event will be delayed by the specified milliseconds or
   * 500 will be used. By default the "keydown" event will be used.
   * @param fn {function} Required. A function to execute each time
   *        the event is triggered.
   * @param iKeyDelay {int} Optional. The time to delay before firing
   *        the callback function after a key event; default is 500ms.
   * @param sKeyEvent {string} Optional. The key event to use;
   *        default is keydown.
   *
   * The signature may also be (oEventData, fn, iKeyDelay, sKeyEvent), and
   * the oEventData will be passed to the callback function on the event
   * object.
   *
   * Note: doesn't work well with $.off, because we are assigning a proxy
   * function. You can always remove all the key and change events from the
   * element, but you can't yet target a single callback function.
   */
  $.fn.changeOrDelayedKey = function(fn, iKeyDelay, sKeyEvent) {
    var iTimeoutId,
      oEventData,
      args = arguments;

    // second signature used, update the variables
    if (!$.isFunction(fn)) {
      oEventData = args[0];
      fn = args[1];
      iKeyDelay = args[2];
      sKeyEvent = args[3];
    }

    if (!iKeyDelay || 0 > iKeyDelay) {
      iKeyDelay = 500;
    }

    if (!sKeyEvent || !this[sKeyEvent]) {
      sKeyEvent = 'keydown';
    }

    // non-delayed event callback, should clear any timeouts, then
    // call the original callback function
    function fnExecCallback() {
      clearTimeout(iTimeoutId);
      fn.apply(this, arguments);
    }

    // delayed event callback, should call the non-delayed callback
    // after a short interval
    function fnDelayCallback() {
      var that = this,
        args = arguments;
      clearTimeout(iTimeoutId);
      iTimeoutId = setTimeout(function() {
        fnExecCallback.apply(that, args);
      }, iKeyDelay);
    }

    if (oEventData) {
      this.change(oEventData, fnExecCallback);
      this[sKeyEvent](oEventData, fnDelayCallback);
    }
    else {
      this.change(fnExecCallback);
      this[sKeyEvent](fnDelayCallback);
    }

    return this;
  };
}(jQuery));