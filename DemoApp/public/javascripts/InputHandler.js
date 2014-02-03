function InputHandler(){
	throw "InputHandler should only be used in static context (via prototype)."
}

InputHandler.prototype = (function() {
	var currentKeyCodes = {}; // A hash of the currently pressed keys.

	return {
		constructor: InputHandler,

		// Initializes the static InputHandler.  
		// Should only be called once per game instance.
		// init: => void
		init: function() {
			var doc = $(document);
			doc.keydown(function(e) {
				currentKeyCodes[e.keyCode] = true;
			});
			doc.keyup(function(e) {
				currentKeyCodes[e.keyCode] = false;
			});
		},

		// Checks if the given key is currently pressed.
		// isPressed: int => bool
		isPressed: function(keyCode) {
			return currentKeyCodes[keyCode] || false;
		}
	}
})();