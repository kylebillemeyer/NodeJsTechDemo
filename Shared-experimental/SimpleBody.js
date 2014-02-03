function SimpleBody(bodyType, mass, x, y){
    this.bodyType = bodyType;
    this.mass = mass;
    this.isGravityAffected = false;
    this.state = new SimpleState(x, y, 0, 0);
    this.deriv = new SimpleDerivative(0, 0, 0, 0);
    this.forces = [];
    this.fixtures = [];
    this.collisionCallbacks = [];
    this.seperationCallbacks = [];
}

SimpleBody.prototype = (function(){
    // Calculate the new state of the body using rk4 integration.
    // See http://gafferongames.com/game-physics/integration-basics/
    // state: Current state of the body.
    // t: Total elapsed time in the simulation.
    // dt: (Delta time) Time since last step.
    function rk4Integrate(state, t, dt){
        // Calc 4 derivs
        var a = evaluate.call(this, state, new SimpleDerivative(0, 0, 0, 0), t, 0.0);
        var b = evaluate.call(this, state, a, t, dt * 0.5);
        var c = evaluate.call(this, state, b, t, dt * 0.5);
        var d = evaluate.call(this, state, c, t, dt);

        var dxdt = 1.0/6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx);
        var dydt = 1.0/6.0 * (a.dy + 2.0 * (b.dy + c.dy) + d.dy);
        var dvxdt = 1.0/6.0 * (a.dvx + 2.0 * (b.dvx + c.dvx) + d.dvx);
        var dvydt = 1.0/6.0 * (a.dvy + 2.0 * (b.dvy + c.dvy) + d.dvy);

        return new SimpleState(
            state.x + dxdt * dt,
            state.y + dydt * dt,
            state.vx + dvxdt * dt,
            state.vy + dvydt * dt);
    }

    // Evaluate the derivative given the initial state and last calculated derivative
    // initial: The initial state of the body at the beginning of step calculations
    // deriv: The most recently calculated derivative in rk4 integration.
    // t: The current time.
    // dt: The time delta since the last step.
    // SimpleState SimpleDerivative float float => SimpleDerivative
    function evaluate(initial, deriv, t, dt){
        var state = new SimpleState(
                initial.x + deriv.dx * dt, 
                initial.y + deriv.dy * dt,
                initial.vx + deriv.dvx * dt,
                initial.vy + deriv.dvy * dt);

        var accel = acceleration.call(this, state, t+dt);
        return new SimpleDerivative(state.vx, state.vy, accel.x, accel.y);
    }

    function evaluateForces(){
        return this.forces.reduce(function(prev, cur, index, src){
            return { 
                x: prev.x + cur.x, 
                y: prev.y + cur.y 
            };
        }, { x: 0, y: 0 });
    }

    // Calculates the acceleration for the currently derived state at the 
    // end time of the currently derived timestep (t + dt).
    // t: The inital time plus the delta time used for the current derivation.
    // SimpleState float => { x: float, y: float }
    function acceleration(state, t){
        var netForces = evaluateForces.call(this);
        return { 
            x: netForces.x / this.mass,
            y: netForces.y / this.mass
        }
    }

    return {
        constructor: SimpleBody,

        STATIC_BODY: 0,
        DYNAMIC_BODY: 1,
        GRAVITY: 98.8,

        init: function(){
            if (this.isGravityAffected)
                this.applyForce(0, this.mass * this.GRAVITY);
        },

        update: function(time, dt){
            this.state = rk4Integrate.call(this, this.state, time, dt);
        },     

        getSmallerBody: function(body){
            var thisStatic = this.bodyType == this.STATIC_BODY;
            var bodyStatic = body.bodyType == this.STATIC_BODY;
            if (thisStatic === bodyStatic)
                return this.mass > body.mass ? body : this;
            else if (thisStatic)
                return body;
            else if (bodyStatic)
                return this;
        }   

        // Applies a componentized force on the body.
        // amountX: Force in the x direction, in Newtons.
        // amountY: Force in the y direction, in Newtons.
        applyForce: function(amountX, amountY){
            this.forces.push({ x: amountX, y: amountY });
        },

        addFixture: function(fixture){
            this.fixtures.push(fixture);
            fixture.body = this;
        },

        addCollisionHandler: function(callback){
            this.collisionCallbacks.push(callback);
        },

        addSeperationHandler: function(callback){
            this.seperationCallbacks.push(callback);
        },

        onCollision: function(contact){
            this.collisionCallbacks.forEach(function(prev, cur, index, src){
                return prev || cur(contact);
            });
        },

        onSeperation: function(contact){
            this.seperationCallbacks.forEach(function(func){
                func();
            });
        }
    }
})();