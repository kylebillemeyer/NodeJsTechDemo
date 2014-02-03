// Defines the game object.  Create an instance of the object and call init()
// to start playing.
function DemoGame(){
	this.entities = [];
	this.renderer;
	this.physicsManager;
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
		this.entities.push(new Wall(LEVEL_WIDTH / 2, LEVEL_HEIGHT - 5, LEVEL_WIDTH, WALL_THICKNESS, true));

		// Left wall
		this.entities.push(new Wall(5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT, false));

		// Right wall
		this.entities.push(new Wall(LEVEL_WIDTH - 5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT, false));

		// Player 1
	    this.entities.push(new Player(
	    	{ 
		    	x: (LEVEL_WIDTH / 3) / Settings.scale,
		    	y: (LEVEL_HEIGHT / 2 - 100) / Settings.scale
		    },
	    	65,  // a
	    	68,  // d
	    	32)); // space

	    // Player 2	    
	    this.entities.push(new Player(
	    	{ 
		    	x: (LEVEL_WIDTH  * 2 / 3) / Settings.scale,
		    	y: (LEVEL_HEIGHT / 2 - 100) / Settings.scale
		    },
	    	37,  // a
	    	39,  // d
	    	38)); // space
    }

	return {
		constructor:DemoGame,

		// The main game loop which will be called on each frame tick.
		// float float => void
		update: function(elapsedTime, timeStep) {
			// update managers
			this.physicsManager.update(elapsedTime, timeStep);
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

		    this.physicsManager = new SimplePhysicsManager(this.entities);
		    this.physicsManager.init();

		    this.renderer = new WebGLRenderer(this.entities);
		    this.renderer.init();
	    
	    	var that = this;
		    // Initiates game loop.
		    window.setInterval(
		    	function() {
		    		elapseTime += timeStep;
			    	that.update(elapseTime, timeStep);
			    	that.draw();
			    }, 
			    timeStepSeconds);
		}
	};
})();
