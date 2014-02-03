// Defines the game object.  Create an instance of the object and call init()
// to start playing.
function DemoGame(){
	this.renderer;
	this.leftWall;
	this.rightWall;
	this.ground;
	this.player1;
	this.player2;
}

DemoGame.prototype = (function() {
	var LEVEL_WIDTH = 960,
		LEVEL_HEIGHT = 680,
		WALL_THICKNESS = 10;

	var elapseTime = 0,
		timeStep = 1 / 60,
		timeStepSeconds = timeStep * 1000;

    function setupEntities() {
    	// Ground
		this.ground = new Wall(LEVEL_WIDTH / 2, 5, LEVEL_WIDTH, WALL_THICKNESS, true);

		// Left wall
		this.leftWall = new Wall(5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT, false);

		// Right wall
		this.rightWall = new Wall(LEVEL_WIDTH - 5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT, false);

		// Player 1
	    this.player1 = new Player(
	    	{ 
		    	x: (LEVEL_WIDTH / 3) / Settings.scale,
		    	y: (LEVEL_HEIGHT / 2 + 100) / Settings.scale
		    },
	    	65,  // a
	    	68,  // d
	    	32); // space
	    this.player1.init();

	    // Player 2	    
	    this.player2 = new Player(
	    	{ 
		    	x: (LEVEL_WIDTH  * 2 / 3) / Settings.scale,
		    	y: (LEVEL_HEIGHT / 2 + 100) / Settings.scale
		    },
	    	37,  // left arrow
	    	39,  // right arrow
	    	38); // up arrow
	    this.player2.init();
    }

	return {
		constructor:DemoGame,

		// The main game loop which will be called on each frame tick.
		// float float => void
		update: function(game, elapsedTime, timeStep) {
			this.player1.update(this, elapsedTime, timeStep);
			this.player2.update(this, elapsedTime, timeStep);
		},

		// The main draw loop which will be called on each frame tick.
		// => void
		draw: function() {			
			if (this.renderer)
				this.renderer.draw();
		},

		// This is the game initialization.  At the end of init, the game object
		// will start a timer interval which will control the game loop (see update).
		// => void
		init: function() {   		    
		    setupEntities.call(this);		    

		    // Init game components
		    InputHandler.prototype.init();		    

		    var entities = [this.player1, this.player2, this.ground, this.leftWall, this.rightWall];
		    this.renderer = new WebGLRenderer(entities);
		    this.renderer.init();
	    
	    	var that = this;
		    // Initiates game loop.
		    window.setInterval(
		    	function() {
		    		elapseTime += timeStep;
			    	that.update(that, elapseTime, timeStep);
			    	that.draw();
			    }, 
			    timeStepSeconds);
		}
	};
})();
