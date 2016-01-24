function init()
{
	var canvas = document.getElementById("webgl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);

	if (!gl)
	{
		return;
	}
}

function render()
{
	
}

window.onload = init;
