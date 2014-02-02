function SimpleBody(bodyType, mass, x, y){
    this.bodyType = bodyType;
    this.mass = mass;
    this.state = new SimpleState(x, y, 0, 0);
    this.deriv = new SimpleDerivative(0, 0, 0, 0);
    this.forceX = 0;
    this.forceY = 0;
}

SimpleBody.prototype = function(){
    var K = 10,
        B = 1;

    // Calculate the new state of the body using rk4 integration.
    // See http://gafferongames.com/game-physics/integration-basics/
    // state: Current state of the body.
    // t: Total elapsed time in the simulation.
    // dt: (Delta time) Time since last step.
    function rk4Integrate(state, t, dt){
        // Calc 4 derivs
        var a = evaluate(state, new SimpleDerivative(0, 0, 0, 0), t, 0.0);
        var b = evaluate(state, a, t, dt * 0.5);
        var c = evaluate(state, b, t, dt * 0.5);
        var d = evaluate(state, c, t, dt);

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

        var accel = acceleration(state, t+dt);
        return new SimpleDerivative(state.vx, state.vy, accel.x, accel.y);
    }

    // Calculates the acceleration for the currently derived state at the 
    // end time of the currently derived timestep (t + dt).  Currently 
    // using spring physics but the implementation can be changed.
    // state: The state of the current derivation.
    // t: The inital time plus the delta time used for the current derivation.
    // SimpleState float => { x: float, y: float }
    function acceleration(state, t){
        return { 
            x: -K * state.x - B * state.vx,
            y: -K * state.y - B * state.vy
        }
    }

    return {
        constructor: SimpleBody,

        update: function(time, dt){
            this.state = bk4Integrate(this.state, time, dt);
        }
    }
}