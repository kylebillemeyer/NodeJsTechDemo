##About
This repository is used as a sandbox for learning NodeJS, Canvas/WebGL, Box2Djs, Express (and potentially other MV* libraries) and general javascript design patterns.  For now the demo is a "game" in the loosest sense of the word, in that it consists of two player controlled characters who can jump around.  The end goal is to have a multiplayer "game" that runs in the browser and is networked between players.  It will hopefully have some sort of web app to act as a "lobby" for players to connect with each other.

Plan of action:

##V1: Done
Create a basic browser rendered level with two keyboard controller characters.  The level will just be a boxed in room.  The players will share a keyboard within a single browser.  Realtime game physics will be integrated via Box2Djs, a port of Box2D originally designed in C.  The rendering will be handled with Box2Djs's b2DebugDraw engine.  I'm not entirely sure how it works under the hood, but it hooks into the HTML canvas and uses basic primitive renderings to draw physics objects.

##V2: In progress
Introduce WebGL rendering in favor of debug draw.  This will involve adding camera functionality to follow the player (player 1 anyways, player 2 won't be so lucky). Render some basic solids for the walls and a simple animated sprite for the players.  Add some (potentially) moving platforms to add vertical depth do the level.

##V3: Planned
Introduce networking via NodeJs.  Remove player 2 from the game.  Maintain game state on the server while rendering that state on each client.  Connect the two players through some well known url on the web server.

##V4: Planned
Introduce a lobby system via Express or some MV* framework on top Express.  The lobby will allow players to create game instances and connect with other players.  I doubt I'll implement any sort of matchmaking, more likely it'll will be explicit "hey buddy, here's my game instance url" kind of a deal.

##V5: Speculative
Refactor the major game components into a reusable/pluggable game engine. See my now defunct "Pancakes" repo.

##V6: Super Speculative
Create an in browser level editor that allows custom scripts for programming game logic and.  All of this will be stored in the backend and potentially even collaborative (DerbyJs).
