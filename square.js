function init()
{
	var canvas = document.getElementById("webgl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);

	if (!gl)
	{
		return;
	}

	var square = {
		count: 4,
		positions: {
			values: new Float32Array([
				0.0, 0.0,
				1.0, 0.0,
				0.0, 1.0,
				1.0, 1.0
			])
			numComponenets: 2
		},

		colors: {
			values: new Float32Array([...]),
			numComponents: 3
		},
		indices: {
			values: new Uint16Array([0, 1, 3, 2])
		},

		init: function()
		{
			this.program = initShaders(gl, "vertex-shader", "fragent-shader");
			this.positions.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);
			this.positions.attribute = gl.getAttribLocation(program, "vPosition");
			//repeat for other variables as well
			this.indices.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW);
		}

		draw: function()
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
			gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
			gl.enableVertexAttribArray(this.positions.attribute);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
			gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
		}

	};

	Square.positions.buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Square.positions.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, Square.positions.values, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Square.indices.buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Square.indices.values, gl.STATIC_DRAW);
	var vPosition = gl.GetAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, Square.positions.numComponents, gl.FLOAT, 0, 0);
	gl.enableVertexAttribArray(vPosition);
}

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);

	var start = 0;
	var count = Square.count;
	gl.drawArrays(gl.TRAINGLE_STRIP, start, count);
	
}

attribute vec4 vPosition;

void main()
{
	vPosition.xy -= vec2(0.5);
	vPosition.xy *= 1.5 / 1.0;
	gl_Position = vPosition;
}

window.onload = init;
