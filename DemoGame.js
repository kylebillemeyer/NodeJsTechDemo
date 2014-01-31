// Defines the game object.  Create an instance of the object and call init()
// to start playing.
function DemoGame(settings){
	this.world;
	this.player1;
	this.player2;
	this.settings = settings;
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

	// Creates the physical ground for the player to walk on.
	// => void
	function createWalls() {
		// Ground
		createWall.call(this, LEVEL_WIDTH / 2, LEVEL_HEIGHT - 5, LEVEL_WIDTH, WALL_THICKNESS, true);

		// Left wall
		createWall.call(this, 5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT,false);

		// Right wall
		createWall.call(this, LEVEL_WIDTH - 5, LEVEL_HEIGHT / 2, WALL_THICKNESS, LEVEL_HEIGHT, false);
	};

	// Creates a wall at the given x, y with the given width/height.
	// All parameters are scaled internally.
	// float float float float => void
	function createWall(x, y, width, height, isGround) {
		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.friction = isGround ? 0.5 : 0.0;
		fixDef.restitution = 0.0;

		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_staticBody;
		       
		// positions the center of the object (not upper left!)
		bodyDef.position.x = x / SCALE;
		bodyDef.position.y = y / SCALE;

		fixDef.shape = new b2PolygonShape;
       
		// half width, half height.
		fixDef.shape.SetAsBox(width / 2 / SCALE, height / 2 / SCALE);
		fixDef.userData = { isGround: isGround };

		this.world.CreateBody(bodyDef).CreateFixture(fixDef);
	}

	// Creates a player object with the given parameters.
	// Warning: Do not use the same keys for multiple players.
	// b2Vec2 int int int => void
	function createPlayer(position, leftKey, rightKey, jumpKey) {
		var newPlayer = new Player(position, leftKey, rightKey, jumpKey);
		newPlayer.init(this.world);

		return newPlayer;
	};	

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
	    	var dataA = contact.GetFixtureA().GetUserData();
	    	var dataB = contact.GetFixtureB().GetUserData();
	    	if (dataA.isPlayer && dataB.isGround) {
    			dataA.touchingGround = true;
	    	}
	    	else if (dataB.isPlayer && dataA.isGround) {
	    		dataB.touchingGround = true;
	    	}
	    }
	    contactListener.EndContact = function(contact) {
	    	var dataA = contact.GetFixtureA().GetUserData();
	    	var dataB = contact.GetFixtureB().GetUserData();
	    	if (dataA.isPlayer && dataB.isGround) {
    			dataA.touchingGround = false;
	    	}
	    	else if (dataB.isPlayer && dataA.isGround) {
	    		dataB.touchingGround = false;
	    	}
	    }

	    this.world.SetContactListener(contactListener);
    }

    function setupEntities() {
    	createWalls.call(this);
	    player1 = createPlayer.call(this, { 
		    	x: (LEVEL_WIDTH / 3) / SCALE,
		    	y: (LEVEL_HEIGHT - 100) / SCALE
		    },
	    	65,  // a
	    	68,  // d
	    	32); // space
	    player2 = createPlayer.call(this, { 
		    	x: (LEVEL_WIDTH  * 2 / 3) / SCALE,
		    	y: (LEVEL_HEIGHT - 100) / SCALE
		    },
	    	37,  // a
	    	39,  // d
	    	38); // space
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
			player1.update();
			player2.update();
		},

		// The main draw loop which will be called on each frame tick.
		// => void
		draw: function() {			
		    if (this.settings.useDebugDraw)
				this.world.DrawDebugData();
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

		    // Init game components
		    InputHandler.prototype.init();
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
