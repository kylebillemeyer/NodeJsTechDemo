function SimplePhysicsManager(entities){
    this.entities = entities;
}

SimplePhysicsManager.prototype = (function(){

    return {
        constructor: SimplePhysicsManager,

        init: function() {
            this.entities.forEach(function(entity) { 
                var body = entity.getBody();
                body.init();
            });
        },

        update: function(time, dt) {
            this.entities.forEach(function(entity) { 
                var body = entity.getBody();
                if (body.bodyType !== SimpleBody.prototype.STATIC_BODY)
                    body.update(time, dt);
            });

            var collisionFixtures = this.entities.reduce(
                function(prev, cur, index, src){
                    return prev.concat(cur.body.fixtures);
                }, 
                []);

            for (var i = 0; i < collisionFixtures.length; i++){
                for (var j = i+1; j < collisionFixtures.length; j++){
                    var a = collisionFixtures[i];
                    var b = collisionFixtures[j];
                    var aStatic = a.body.bodyType === SimpleBody.prototype.STATIC_BODY;
                    var bStatic = b.body.bodyType === SimpleBody.prototype.STATIC_BODY;
                    if (a.body != b.body && aStatic !== bStatic){
                        if (b.isBB){
                            if (a.collidesBB(b)){
                                var cancelA = a.body.onCollision(b);
                                var cancelB = b.body.onCollision(a);

                                if (!(cancelA || cancelB))
                                    a.resolveCollisionBB(b);
                            }
                        }
                    }
                }
            }
        }
    }
})();