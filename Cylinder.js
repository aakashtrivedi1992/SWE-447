var modViewMatrix = null;
var projMatrix = null;
var modelMatrix = null;
var viewMatrix = null;


var Cylinder = {
  count : 32,
  positions : {
    bott : {
      values : new Array(),
    },
    theTop : {
      values : new Array(),
    },
    sides : {
      values : new Array(),
    },
  },

  AddPoint : function(){
    a=0, b=0, y=0;                              //Origin
    r = 1.0, g =1.0, b = 1.0, a = 1.0;           //RGBA color values
    rbt = 1.0, gbt = 0.0, bbt= 0.0;
    theta = (Math.PI/180) * ( 360 / this.count);  // Degrees = radians * (180 / pi)

    for (i = 0; i <= this.count; i++){
      x = Math.cos(theta*i);
      z = Math.sin(theta*i);

      this.positions.bott.values.push(x, y, z);
      this.positions.bott.values.push(rbt, gbt, bbt, a);

      this.positions.sides.values.push(x, y, z);
      this.positions.sides.values.push(r, g, b, a);
      this.positions.sides.values.push(x, y + 2, z);
      this.positions.sides.values.push(r, g, b, a);

      this.positions.theTop.values.push(x, y + 2, z);
      this.positions.theTop.values.push(rbt, gbt, bbt, a);
    }
  },
  init : function(){
    this.program = initShaders(gl, "Cylinder-vertex-shader", "Cylinder-fragment-shader");

    this.AddPoint();

    bottomFloat32 = new Float32Array(this.positions.bott.values);
    sideFloat32 = new Float32Array(this.positions.sides.values);
    topFloat32 = new Float32Array(this.positions.theTop.values);

    // Create Buffers for top, side, bot
    this.positions.bott.buffer = gl.createBuffer();
    this.positions.sides.buffer = gl.createBuffer();
    this.positions.theTop.buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.theTop.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, topFloat32, gl.STATIC_DRAW);
    this.positions.theTop.buffer.nmbrOfVertices = topFloat32.length/7;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.bott.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bottomFloat32, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.sides.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, sideFloat32, gl.STATIC_DRAW);
    this.positions.sides.buffers.nmbrOfVertices = sideFloat32.length/7;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  },
  drawBottom : function(){
    var stride = (3 + 4)*4; //4 bytes per vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.bott.buffer);
    this.positions.bott.attribute = gl.getAttribLocation(this.program, "vPosition");
    gl.vertexAttribPointer(this.positions.bott.attribute, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(this.positions.bott.attribute);

    var colorOffset = 3 * 4;
    vColor = gl.getAttribLocation(this.program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, stride, colorOffset);
    gl.enableVertexAttribArray(vColor);


    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.positions.bott.buffer.nmbrOfVertices);
  },
  drawSides : function(){
    var stride = (3 + 4)*4;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.sides.buffer);
    this.positions.sides.attribute = gl.getAttribLocation(this.program, 'vPosition');
    gl.vertexAttribPointer(this.positions.sides.attribute, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(this.positions.sides.attribute);

    var colorOffset = 3 * 4;
    vColor = gl.getAttribLocation(this.program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, stride, colorOffset);
    gl.enableVertexAttribArray(vColor);


    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.positions.sides.buffers.nmbrOfVertices);
  },
  drawTop : function(){
    var stride = (3 + 4)*4; //4 bytes per vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.theTop.buffer);
    this.positions.theTop.attribute = gl.getAttribLocation(this.program, "vPosition");
    gl.vertexAttribPointer(this.positions.theTop.attribute, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(this.positions.theTop.attribute);

    var colorOffset = 3 * 4;
    vColor = gl.getAttribLocation(this.program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, stride, colorOffset);
    gl.enableVertexAttribArray(vColor);


    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.positions.theTop.buffer.nmbrOfVertices);
  },
  draw : function(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);


    this.drawTop();
    this.drawBottom();
    this.drawSides();
  },
}