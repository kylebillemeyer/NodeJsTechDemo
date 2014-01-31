// Defines the game object.  Create an instance of the object and call init()
// to start playing.
function DemoGame(settings){
	this.settings = settings;
	this.world;
	this.entities = [];
	this.renderer;
}

DemoGame.prototype = (function() {
	var SCALE = 30
		,	LEVEL_WIDTH = 960
		,	LEVEL_HEIGHT = 680
		,	WALL_THICKNESS = 10
		;
	var b2Vec2 = Box2D.Common.Math.b2Vec2
     	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
     	,	b2Body = Box2D.Dynamics.b2Body
     	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
     	,	b2Fixture = Box2D.Dynamics.b2Fixture
     	,	b2World = Box2D.Dynamics.b2World
     	,	b2ContactListener = Box2D.Dynamics.b2ContactListener
     	,	b2MassData = Box2D.Collision.Shapes.b2MassData
     	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
     	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
     	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,   canvas = $('#canvas')
		;	context = canvas.get(0).getContext('2d');

    function setupDebugDraw() {
	    //setup debug draw
	    var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(context);
		debugDraw.SetDrawScale(SCALE);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this.world.SetDebugDraw(debugDraw);
    }

    function setupContactListeners() {
    	var contactListener = new b2ContactListener();
	    contactListener.BeginContact = function(contact) {
	    	var entityA = contact.GetFixtureA().GetUserData();
	    	var entityB = contact.GetFixtureB().GetUserData();
	    	entityA.collided(entityB);
	    	entityB.collided(entityA);
	    }
	    contactListener.EndContact = function(contact) {
	    	var entityA = contact.GetFixtureA().GetUserData();
	    	var entityB = contact.GetFixtureB().GetUserData();
	    	entityA.seperated(entityB);
	    	entityB.seperated(entityA);
	    }

	    this.world.SetContactListener(contactListener);
    }

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
		    	x: (LEVEL_WIDTH / 3) / SCALE,
		    	y: (LEVEL_HEIGHT - 100) / SCALE
		    },
	    	65,  // a
	    	68,  // d
	    	32)); // space

	    // Player 2	    
	    this.entities.push(new Player(
	    	{ 
		    	x: (LEVEL_WIDTH  * 2 / 3) / SCALE,
		    	y: (LEVEL_HEIGHT - 100) / SCALE
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
			this.world.Step(
				   1 / 60   //frame-rate
				,  10       //velocity iterations
				,  10       //position iterations
			);
			this.world.ClearForces();

			// Update game components 
			this.entities.forEach(function(entity){ entity.update(); });
		},

		// The main draw loop which will be called on each frame tick.
		// => void
		draw: function() {			
		    if (this.settings.useDebugDraw)
				this.world.DrawDebugData();

			this.entities.forEach(function(entity){ entity.draw(); });
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
		    renderer = new WebGLRenderer(this.entities);
		    renderer.init();
	    	setupDebugDraw.call(this);	
		    setupContactListeners.call(this);

		    // resize the canvas to fill browser window dynamically
		    window.addEventListener(
		    	'resize',
		    	function() {
			        canvas.width = window.innerWidth;
			        canvas.height = window.innerHeight;
			    }, 
			    false);
	    
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
