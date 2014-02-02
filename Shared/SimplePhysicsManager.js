function SimplePhysicsManager(entities){
    this.entities = entities;
}

SimplePhysicsManager.prototype = (function(){

    return {
        constructor: SimplePhysicsManager,

        init: function() {

        },

        update: function(time, dt) {
            this.entities.forEach(function(entity) { 
                var body = entity.getBody();
                if (body.bodyType != SimpleBody.STATIC_BODY)
                    body.update(time, dt); 
            });
        }
    }
})();