function Box2DPhysicsManager(entities){
    this.entities = entities;
    this.world;
}

Box2DPhysicsManager.prototype = (function(){
    var     b2Vec2 = Box2D.Common.Math.b2Vec2
        ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
        ,   b2Body = Box2D.Dynamics.b2Body
        ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        ,   b2Fixture = Box2D.Dynamics.b2Fixture
        ,   b2World = Box2D.Dynamics.b2World
        ,   b2ContactListener = Box2D.Dynamics.b2ContactListener
        ,   b2MassData = Box2D.Collision.Shapes.b2MassData
        ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw

    function setupDebugDraw() {
        //setup debug draw
        var context = document.getElementById('canvas').getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(context);
        debugDraw.SetDrawScale(Settings.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    }

    function setupContactListeners() {
        var contactListener = new b2ContactListener();
        contactListener.BeginContact = function(contact) {
            var entityA = contact.GetFixtureA().GetUserData();
            var entityB = contact.GetFixtureB().GetUserData();
            entityA.collided(entityB);
            entityB.collided(entityA);
        }
        contactListener.EndContact = function(contact) {
            var entityA = contact.GetFixtureA().GetUserData();
            var entityB = contact.GetFixtureB().GetUserData();
            entityA.seperated(entityB);
            entityB.seperated(entityA);
        }

        this.world.SetContactListener(contactListener);
    }

    return {
        constructor: Box2DPhysicsManager,

        init: function(world){
            this.world = world; 

            //setupDebugDraw.call(this);
            setupContactListeners.call(this);
        },

        update: function(){
            this.world.Step(
                   1 / 60   //frame-rate
                ,  10       //velocity iterations
                ,  10       //position iterations
            );
            this.world.ClearForces();
        }
    }
})();