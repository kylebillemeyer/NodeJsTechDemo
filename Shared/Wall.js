// Creates the wall object
// Initial world x position (center of Wall), in pixels
// Initial world y position (center of Wall), in pixels
// Width, in pixels
// Height, in pixels
// True if this Wall is a ground unit, otherwise false.
// float float float float bool => Wall
function Wall(x, y, width, height, isGround) {
    this.isGround = isGround;
    this.width = width;
    this.height = height;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.body = new SimpleBody(
        SimpleBody.STATIC_BODY, 
        width * height * this.DENSITY, 
        x, y);
}

Wall.prototype = (function(){

    return {
        constructor: Wall,

        DENSITY: 50,

        // Initializes the wall entity, setting up any physics or common logic.
        // SimplePhysicsManager => void
        init: function(){
        },

        // Gets the physics body for the entity.
        // => SimpleBody
        getBody: function(){
            return this.body;
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
            var center = this.body.state;
            renderer.drawRect(center.x, center.y, this.halfWidth, this.halfHeight);
        }
    }
})();