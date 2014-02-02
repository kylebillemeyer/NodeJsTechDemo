function Player(position, leftKey, rightKey, jumpKey) {
	this.body;
	this.fix;
	this.position = position;
	this.leftKey = leftKey;
	this.rightKey = rightKey;
	this.jumpKey = jumpKey;
	this.touchingGround = false;
}

Player.prototype = (function() {
	var     SCALE = 30
		,   DESIRED_VEL = 5
		,   JUMP_FORCE = 1500
        ,   RADIUS = 20 / SCALE
		;
	var b2Vec2 = Box2D.Common.Math.b2Vec2
     	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
     	,	b2Body = Box2D.Dynamics.b2Body
     	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
     	,	b2Fixture = Box2D.Dynamics.b2Fixture
     	,	b2World = Box2D.Dynamics.b2World
     	,	b2MassData = Box2D.Collision.Shapes.b2MassData
     	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
     	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
     	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,   canvas = $('#canvas')
		,	canvasWidth = canvas.width()
		,	canvasHeight = canvas.height()
		;

	function handleInput() {
		var leftDown = InputHandler.prototype.isPressed(this.leftKey);
		var rightDown = InputHandler.prototype.isPressed(this.rightKey);
		
		if (leftDown == rightDown){ 
			// Both are down or neither are down, so stop motion.
			this.moveState = this.moveStates.MS_STOP;
		}
		else if (leftDown) {
			// Left is the only movement key down so move left.
			this.moveState = this.moveStates.MS_LEFT;
		}
		else if (rightDown) {
			// Right is the only movement key down so move right.
			this.moveState = this.moveStates.MS_RIGHT;
		}
	}

	function setupInput(world) {
		var that = this;
		$(document).keydown(function(e) {
			if (e.keyCode === that.jumpKey && that.touchingGround) {
				var impulse = that.body.GetMass() * 10;
				that.body.ApplyImpulse({x: 0, y: -impulse}, that.body.GetWorldCenter());
				that.touchingGround = false;
			}
		});
	}

	function createBody(world) {
		var fixDef = new b2FixtureDef;
		fixDef.density = 2.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.0;

		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;
		       
		// positions the center of the object (not upper left!)
		bodyDef.position.x = this.position.x;
		bodyDef.position.y = this.position.y;
		bodyDef.fixedRotation = true;

		fixDef.shape = new b2CircleShape;
       
		// half width, half height.
		fixDef.shape.Set(0, 0);
		fixDef.shape.SetRadius(RADIUS);

		this.body = world.CreateBody(bodyDef)
		this.fix = this.body.CreateFixture(fixDef);
		this.fix.SetUserData(this);
	}

	return {
		constructor: Player,

		isPlayer: true,
		
		moveStates: { MS_LEFT: 0, MS_STOP: 1, MS_RIGHT: 2 },

		init: function(world) {
			createBody.call(this, world);
			setupInput.call(this);
		},

		update: function() {
			handleInput.call(this);

			var vel = this.body.GetLinearVelocity();
			var desiredVel = 0;

			switch(this.moveState)
			{
				case this.moveStates.MS_LEFT:
					desiredVel = -DESIRED_VEL;
					break;
				case this.moveStates.MS_STOP:
					desiredVel = 0;
					break;
				case this.moveStates.MS_RIGHT:
					desiredVel = DESIRED_VEL;
					break;
			}

			var velChange = desiredVel - vel.x;
			var impulse = this.body.GetMass() * velChange;
			this.body.ApplyImpulse(
				new b2Vec2(impulse, 0), 
				this.body.GetWorldCenter());
		},

		// Callback invoked when this entity collides with another.
        // contact: The entity this entity is making contact with.
        // entity => void
        collided: function(contact){
        	if (contact.isGround)
        		this.touchingGround = true;
        },

        // Callback invoked when this entity seperates from another 
        // it has collided with.
        // contact: The entity this entity was making contact with.
        seperated: function(contact){
        	if (contact.isGround)
        		this.touchingGround = false;
        },

        // Draw the player each tick.
        // renderer => void
        draw: function(renderer){
            var center = this.body.GetWorldCenter();
            renderer.drawRect(
                center.x, center.y, RADIUS, RADIUS, 
                { r: 0.0, g: 0.0, b: 1.0, a: 1.0 });
        }
	}
})();