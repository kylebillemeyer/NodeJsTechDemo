// Defines the game object.  Create an instance of the object and call init()
// to start playing.
function DemoGame(){
	this.world;
	this.entities = [];
	this.renderer;
	this.physicsManager;
}

DemoGame.prototype = (function() {
	var 	LEVEL_WIDTH = 960
		,	LEVEL_HEIGHT = 680
		,	WALL_THICKNESS = 10
		;

	var   b2World = Box2D.Dynamics.b2World
		, b2Vec2 = Box2D.Common.Math.b2Vec2
		;

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
		    	y: (LEVEL_HEIGHT - 100) / Settings.scale
		    },
	    	65,  // a
	    	68,  // d
	    	32)); // space

	    // Player 2	    
	    this.entities.push(new Player(
	    	{ 
		    	x: (LEVEL_WIDTH  * 2 / 3) / Settings.scale,
		    	y: (LEVEL_HEIGHT - 100) / Settings.scale
		    },
	    	37,  // a
	    	39,  // d
	    	38)); // space
    }

	return {
		constructor:DemoGame,

		// The main game loop which will be called on each frame tick.
		// => void
		update: function() {
			// update managers
			this.physicsManager.update();

			// Update game components 
			this.entities.forEach(function(entity){ entity.update(); });
		},

		// The main draw loop which will be called on each frame tick.
		// => void
		draw: function() {			
		    if (Settings.useDebugDraw)
				this.world.DrawDebugData();

			if (this.renderer)
				this.renderer.draw();
		},

		// This is the game initialization.  At the end of init, the game object
		// will start a timer interval which will control the game loop (see update).
		// => void
		init: function() {			   
		    // Init world and its entities
			this.world = new b2World(
		        	new b2Vec2(0, 10)    //gravity
		        ,   true                 //allow sleep
		    );	    		    
		    setupEntities.call(this);
		    var that = this;
		    this.entities.forEach(function(entity) { entity.init(that.world) });

		    // Init game components
		    InputHandler.prototype.init();

		    this.physicsManager = new PhysicsManager(this.entities);
		    this.physicsManager.init(this.world);

		    this.renderer = new WebGLRenderer(this.entities);
		    this.renderer.init();
	    
	    	var that = this;
		    // Initiates game loop.
		    window.setInterval(
		    	function() {
			    	that.update();
			    	that.draw();
			    }, 
			    1000 / 60);
		}
	};
})();
