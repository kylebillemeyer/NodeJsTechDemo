function WebGLRenderer(entities) {
    this.entities = entities;
}

WebGLRenderer.prototype = (function(){
    var gl
        , canvas = document.getElementById('canvas')
        ;

    function initGL(){
        try {
            // Try to grab the standard context. If it fails, fallback to experimental.
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {}
          
        // If we don't have a GL context, give up now
        if (!gl) {
            alert("Unable to initialize WebGL. Your browser may not support it.");
            gl = null;
        }

        if (gl){
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(g1.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        }
    }

    function initShaders(){
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");
      
        // Create the shader program      
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
      
        // If creating the shader program failed, alert      
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }
      
        gl.useProgram(shaderProgram);
      
        vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
    }

	return {
		constructor: WebGLRenderer,
		
		init: function(){		
            initGL.call(this);
            if (gl){
                initShaders.call(this);
            }				
		},

		draw: function(){

		}
	}
})();