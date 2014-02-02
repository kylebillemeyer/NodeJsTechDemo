function SimplePhysicsManager(entities){
    this.entities = entities;
}

SimplePhysicsManager.prototype = (function(){

    return {
        constructor: SimplePhysicsManager,

        init: function() {

        }

        update: function(time, dt) {
            this.entities.forEach(function(entity) { 
                entity.update(time, dt); 
            });
        }
    }
})();