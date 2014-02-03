function SimpleBB(relX, relY, width, height){
    this.isBB = true;
    this.relX = relX;
    this.relY = relY;
    this.halfWidth = width / 2;
    this.halfHeight = height / 2;
    this.body;
}

SimpleBB.prototype = (function(){
    function getColIntersectionRect(contact){
        var bbA = this.getBB();
        var bbB = contact.getBB();

        return {
            top: Math.min(bbA.top, bbB.top),
            bot: Math.max(bbA.bot, bbB.bot),
            left: Math.max(bbA.left, bbB.left),
            right: Math.min(bbA.right, bbB.right)
        }
    }

    return {
        constructor: SimpleBB,

        getWorldCenter: function(){
            return { 
                x: this.body.state.x + this.relX,
                y: this.body.state.y + this.relY
            }
        },

        getBB: function(){
            var center = this.getWorldCenter();         

            return { 
                left: center.x - this.halfWidth,
                right: center.x + this.halfWidth,
                bot: center.y - this.halfHeight,
                top: center.y + this.halfHeight
            }
        },

        resolveCollisionBB: function(contact){
            var colRect = getColIntersectionRect.call(this, contact);
            var colWidth = colRect.right - colRect.left;
            var colHeight = colRect.top - colRect.bot;
            var minAdj = Math.min(colWidth, colHeight);

            var nonStatic = this.body.isStatic ? contact.body : this.body; 
            if (colWidth > colHeight){
                nonStatic.state = new SimpleState(
                    nonStatic.state.x - colWidth,
                    nonStatic.state.)
            }
        },

        // Determines if this bounding box collides with another.
        // into: the other bounding box.
        // SimpleBB => bool
        collidesBB: function(contact){
            var a = this.getBB();
            var b = contact.getBB();

            return !(a.bot > b.top ||
                     a.top < b.bot ||
                     a.left > b.right ||
                     a.right < b.left);
        }
    }
})();