function Player(position, leftKey, rightKey, jumpKey) {
    this.isPlayer = true;
	this.body = new SimpleBody(SimpleBody.prototype.DYNAMIC_BODY, 25, position.x, position.y);
    var width = this.RADIUS * 2;
    this.body.addFixture(new SimpleBB(0, 0, width, width));
    this.body.isGravityAffected = true;
	this.leftKey = leftKey;
	this.rightKey = rightKey;
	this.jumpKey = jumpKey;
	this.touchingGround = false;
}

Player.prototype = (function() {
	var DESIRED_VEL = 5,
		JUMP_FORCE = 1500;

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
				/*var impulse = that.body.GetMass() * 10;
				that.body.ApplyImpulse({x: 0, y: -impulse}, that.body.GetWorldCenter());
				that.touchingGround = false;*/
			}
		});
	}

	return {
		constructor: Player,
		
		moveStates: { MS_LEFT: 0, MS_STOP: 1, MS_RIGHT: 2 },

        RADIUS: 20,

		init: function() {
            this.body.addCollisionHandler(collided);
            this.body.addSeperationHandler(seperated);			
		},

        // Gets the physics body for the entity.
        // => SimpleBody
        getBody: function(){
            return this.body;
        },

		update: function() {
			handleInput.call(this);

			/*var vel = this.body.GetLinearVelocity();
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
				this.body.GetWorldCenter());*/
		},

		// Callback invoked when this entity collides with another.
        // contact: The entity this entity is making contact with.
        // return: true if collision correction should be cancelled
        // entity => bool
        collided: function(contact){
        	if (contact.isGround)
        		this.touchingGround = true;

            return false;
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
            var center = this.body.state;
            renderer.drawRect(
                center.x, center.y, this.RADIUS, this.RADIUS, 
                { r: 0.0, g: 0.0, b: 1.0, a: 1.0 });
        }
	}
})();