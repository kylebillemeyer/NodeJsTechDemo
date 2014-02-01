// Creates the wall object
// Initial world x position (center of Wall), in pixels
// Initial world y position (center of Wall), in pixels
// Width, in pixels
// Height, in pixels
// True if this Wall is a ground unit, otherwise false.
// float float float float bool => Wall
function Wall(x, y, width, height, isGround) {
    this.isGround = isGround;
    this.x = x / Settings.scale;
    this.y = y / Settings.scale;
    this.width = width / Settings.scale;
    this.height = height / Settings.scale;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.body;
    this.fix;
}

Wall.prototype = (function(){
    var     DENSITY = 1.0
        ,   FRICTION = 0.0
        ,   GROUND_FRICTION = 0.5
        ,   RESTITUTION = 0.0
        ;
    var     b2Vec2 = Box2D.Common.Math.b2Vec2
        ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
        ,   b2Body = Box2D.Dynamics.b2Body
        ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        ,   b2Fixture = Box2D.Dynamics.b2Fixture
        ,   b2World = Box2D.Dynamics.b2World
        ,   b2MassData = Box2D.Collision.Shapes.b2MassData
        ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,   canvas = $('#canvas')
        ,   canvasWidth = canvas.width()
        ,   canvasHeight = canvas.height()
        ;

    // Sets up the wall entity's physics.
    // b2World => void
    function setupPhysics(world){
        var fixDef = new b2FixtureDef;
        fixDef.density = DENSITY;
        fixDef.friction = this.isGround ? GROUND_FRICTION : FRICTION;
        fixDef.restitution = RESTITUTION;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
               
        // positions the center of the object (not upper left!)
        bodyDef.position.x = this.x;
        bodyDef.position.y = this.y;

        fixDef.shape = new b2PolygonShape;
       
        // half width, half height.
        fixDef.shape.SetAsBox(this.width / 2, this.height / 2);
        fixDef.userData = this;

        this.body = world.CreateBody(bodyDef)
        this.fix = this.body.CreateFixture(fixDef);
    }

    return {
        constructor: Wall,

        // Initializes the wall entity, setting up any physics or common logic.
        // b2World => void
        init: function(world){
            setupPhysics.call(this, world);
        },

        // Handles game logic for the wall entity each tick.
        // => void
        update: function(){

        },

        // Callback invoked when the this entity collides with another.
        // contact: The entity this entity is making contact with.
        // entity => void
        collided: function(contact){

        },

        // Callback invoked when this entity seperates from another 
        // it has collided with.
        // contact: The entity this entity was making contact with.
        seperated: function(contact){

        },

        // Draws the wall entity each tick.
        // WebGLRenderer => void
        draw: function(renderer){
            renderer.drawRect(this.x, this.y, this.halfWidth, this.halfHeight);
        }
    }
})();