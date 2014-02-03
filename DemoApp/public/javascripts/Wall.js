// Creates the wall object
// Initial world x position (center of Wall), in pixels
// Initial world y position (center of Wall), in pixels
// Width, in pixels
// Height, in pixels
// True if this Wall is a ground unit, otherwise false.
// float float float float bool => Wall
function Wall(x, y, width, height, isGround) {
    this.isGround = isGround;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
}

Wall.prototype = (function(){
    return {
        constructor: Wall,

        DENSITY: 5,

        // Initializes the wall entity.
        // => void
        init: function(){
        },

        // Handles game logic for the wall entity each tick.
        // => void
        update: function(){
        },

        // Draws the wall entity each tick.
        // WebGLRenderer => void
        draw: function(renderer){
            renderer.drawRect(this.x, this.y, this.halfWidth, this.halfHeight);
        }
    }
})();