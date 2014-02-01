function WebGLRenderer(entities) {
    this.entities = entities;
    this.positionLocation;
    this.colorLocation;
    this.buffer;
    this.gl;
}

WebGLRenderer.prototype = (function(){
    var canvas = document.getElementById('canvas');

	return {
		constructor: WebGLRenderer,
		
		init: function(){		
            // Get A WebGL context
            this.gl = getWebGLContext(canvas);
            if (!this.gl) {
                return;
            }

            // setup GLSL program
            var vertexShader = createShaderFromScriptElement(this.gl, "2d-vertex-shader");
            var fragmentShader = createShaderFromScriptElement(this.gl, "2d-fragment-shader");
            var program = createProgram(this.gl, [vertexShader, fragmentShader]);
            this.gl.useProgram(program);

            // look up where the vertex data needs to go.
            this.positionLocation = this.gl.getAttribLocation(program, "a_position");
            this.colorLocation = this.gl.getUniformLocation(program, "u_color");

            // set the resolution
            var resolutionLocation = this.gl.getUniformLocation(program, "u_resolution");
            this.gl.uniform2f(resolutionLocation, Settings.canvasWidth, Settings.canvasHeight);			

            // setup a rectangle from 10,20 to 80,30 in pixels
            this.buffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);            

            this.gl.enableVertexAttribArray(this.positionLocation);
            this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);

            // Set a random color.
            /*this.gl.uniform4f(this.colorLocation, 0.0, 1.0, 0.0, 1);

            this.gl.bufferData(
                this.gl.ARRAY_BUFFER, 
                new Float32Array([
                    0, 670,
                    960, 670,
                    0, 680,
                    0, 680,
                    960, 670,
                    960, 680]), 
                this.gl.STATIC_DRAW);

            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

            this.gl.bufferData(
                this.gl.ARRAY_BUFFER, 
                new Float32Array([
                    0, 0,
                    10, 0,
                    0, 680,
                    0, 680,
                    10, 0,
                    10, 680]), 
                this.gl.STATIC_DRAW);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);*/
		},

		draw: function(){
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            var that = this;
            this.entities.forEach(function(entity){ entity.draw(that); });
		},

        // Draws a rectangle on the WebGL canvas using the given position 
        // and dimensions.
        // x: Center x coordinate in physics units
        // y: Center y coordinate in physics units
        // halfWidth: Half the desired width in physics units
        // halfHeight: Half the desired height in physics units
        // color: An RGBA hash of the format { r: float, g: float, b: float, a: float }
        // float float float float color => void
        drawRect: function(x, y, halfWidth, halfHeight, color){
            var topLeftX = (x - halfWidth) * Settings.scale;
            var topLeftY = (y + halfHeight) * Settings.scale;

            var topRightX = (x + halfWidth) * Settings.scale;
            var topRightY = (y + halfHeight) * Settings.scale;

            var botRightX = (x + halfWidth) * Settings.scale;
            var botRightY = (y - halfHeight) * Settings.scale;

            var botLeftX = (x - halfWidth) * Settings.scale;
            var botLeftY = (y - halfHeight) * Settings.scale;

            this.gl.bufferData(
                this.gl.ARRAY_BUFFER, 
                new Float32Array([
                    topRightX, topRightY,
                    topLeftX, topLeftY,
                    botRightX, botRightY,
                    botRightX, botRightY,
                    topLeftX, topLeftY,
                    botLeftX, botLeftY]), 
                this.gl.STATIC_DRAW);

            if (!color)
                color = { r: 0.0, g: 1.0, b: 0.0, a: 1.0 };
            
            this.gl.uniform4f(this.colorLocation, color.r, color.g, color.b, color.a);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        }
	}
})();