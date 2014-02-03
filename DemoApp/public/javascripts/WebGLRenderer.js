function WebGLRenderer(entities) {
    this.entities = entities;
    this.primitiveProgram;
    this.textureProgram;
    this.gl;
    this.programState;
}

WebGLRenderer.prototype = (function(){
    var canvas = document.getElementById('canvas');

    function createPrimitiveProgram(){
        // setup GLSL program
        var vShader = createShaderFromScriptElement(this.gl, "prim-vert-shader");
        var fShader = createShaderFromScriptElement(this.gl, "prim-frag-shader");
        var prog = createProgram(this.gl, [vShader, fShader]);        

        return {
            vertexShader: vShader,
            fragmentShader: fShader,
            program: prog
        }
    }

    function setPrimitiveProgram(){
        var program = this.primitiveProgram.program;
        this.gl.useProgram(program);

        // look up where the vertex data needs to go.
        var posLoc = this.primitiveProgram.positionLocation = 
            this.gl.getAttribLocation(program, "a_position");
        var colLoc = this.primitiveProgram.colorLocation = 
            this.gl.getUniformLocation(program, "u_color");

        // set the resolution
        var resLoc = this.primitiveProgram.resolutionLocation = 
            this.gl.getUniformLocation(program, "u_resolution");
        this.gl.uniform2f(resLoc, Settings.canvasWidth, Settings.canvasHeight);         

        // setup a rectangle from 10,20 to 80,30 in pixels
        var buffer = this.primitiveProgram.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);            

        this.gl.enableVertexAttribArray(posLoc);
        this.gl.vertexAttribPointer(posLoc, 2, this.gl.FLOAT, false, 0, 0);

        this.programState = this.PRIM_PROG;
    }

    function ensurePrimitiveProgram(){
        if (this.programState !== this.PRIM_PROG )
            setPrimitiveProgram.call(this);
    }

	return {
		constructor: WebGLRenderer,

        PRIM_PROG: 0,
        TEX_PROG:  1, 
		
		init: function(){		
            // Get A WebGL context
            this.gl = getWebGLContext(canvas);
            if (!this.gl) {
                return;
            }

            this.primitiveProgram = createPrimitiveProgram.call(this);
            setPrimitiveProgram.call(this);  
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
            ensurePrimitiveProgram.call(this);

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

            this.gl.uniform4f(
                this.primitiveProgram.colorLocation, 
                color.r, color.g, color.b, color.a);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        }
	}
})();