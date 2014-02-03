function Player(position, leftKey, rightKey, jumpKey) {
    this.state = new State(position.x, position.y, 0, 0);
	this.leftKey = leftKey;
	this.rightKey = rightKey;
	this.jumpKey = jumpKey;
	this.touchingGround = false;
}

Player.prototype = (function() {
	var WALK_SPEED = 10000,
		JUMP_SPEED = 500,
        GRAVITY = 1000;

	function handleInput() {
		var leftDown = InputHandler.prototype.isPressed(this.leftKey);
		var rightDown = InputHandler.prototype.isPressed(this.rightKey);
		
        if (leftDown && rightDown){
            this.something = 'debug'
        }
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

	function setupInput() {
		var that = this;
		$(document).keydown(function(e) {
			if (e.keyCode === that.jumpKey && that.touchingGround) {
				that.state = new State(
                    that.state.x, that.state.y, 
                    that.state.vx, JUMP_SPEED);
                that.touchingGround = false;
			}
		});
	}

    function integrateNewState(dt){
        return new State(
            this.state.x + this.state.vx * dt,
            this.state.y + this.state.vy * dt,
            this.state.vx,
            this.state.vy - (GRAVITY * dt));
    }

    function getBB(x, y, halfWidth, halfHeight){
        return { 
            left: x - halfWidth,
            right: x + halfWidth,
            bot: y - halfHeight,
            top: y + halfHeight
        }
    }

    function collidesBB(wall){
        var a = getBB(this.state.x, this.state.y, this.RADIUS, this.RADIUS);
        var b = getBB(wall.x, wall.y, wall.halfWidth, wall.halfHeight);

        return !(a.bot > b.top ||
                 a.top < b.bot ||
                 a.left > b.right ||
                 a.right < b.left);
    }

    function handleCollision(wall){
        if (collidesBB.call(this, wall)){
            if (wall.isGround){
                this.state = new State(
                    this.state.x, wall.y + wall.halfHeight + this.RADIUS,
                    this.state.vx, 0);
                this.touchingGround = true;
            }

            else {
                var newX = this.state.x;
                if (this.state.vx > 0)
                    newX = wall.x - wall.halfWidth - this.RADIUS;
                else if (this.state.vx < 0)
                    newX = wall.x + wall.halfWidth + this.RADIUS;            
                this.state = new State(
                    newX, this.state.y, 0, this.state.vy);
            }
        }
    }

	return {
		constructor: Player,
		
		moveStates: { MS_LEFT: 0, MS_STOP: 1, MS_RIGHT: 2 },

        RADIUS: 20,

		init: function() {	
            setupInput.call(this);	
		},

		update: function(game, time, dt) {
			handleInput.call(this);

            var newVx = 0;
            switch(this.moveState)
            {
                case this.moveStates.MS_LEFT:
                    newVx = -WALK_SPEED;
                    break;
                case this.moveStates.MS_RIGHT:
                    newVx = WALK_SPEED;
                    break;
            }

            newVx *= dt;
            this.state = new State(
                this.state.x, this.state.y,
                newVx, this.state.vy)
            this.state = integrateNewState.call(this, dt);

            handleCollision.call(this, game.leftWall);
            handleCollision.call(this, game.rightWall);
            handleCollision.call(this, game.ground);
		},

        // Draw the player each tick.
        // renderer => void
        draw: function(renderer){
            renderer.drawRect(
                this.state.x, this.state.y, this.RADIUS, this.RADIUS, 
                { r: 0.0, g: 0.0, b: 1.0, a: 1.0 });
        }
	}
})();