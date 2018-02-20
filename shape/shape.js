// mid point algorithm to get all points of circle
function drawCircleShape() {
    var x = parseInt(document.getElementById('circleX').value);
    var y = parseInt(document.getElementById('circleY').value);
    var r = parseInt(document.getElementById('radius').value);
    circleMidPoint(x, y, r);
}

function circleMidPoint(x0, y0, radius) {
    $("#shape").empty(); 
    var x = radius, y = 0;
    var radiusError = 1-x;
   
    while(x >= y) {
      drawPixel(x + x0, y + y0);
      drawPixel(y + x0, x + y0);
      drawPixel(-x + x0, y + y0);
      drawPixel(-y + x0, x + y0);
      drawPixel(-x + x0, -y + y0);
      drawPixel(-y + x0, -x + y0);
      drawPixel(x + x0, -y + y0);
      drawPixel(y + x0, -x + y0);
   
      y++;
      if(radiusError<0)
          radiusError+=2*y+1;
      else
          {
          x--;
          radiusError+=2*(y-x+1);
      }
    }
}

function clearCircle() {
    $("#shape").empty();
    document.getElementById('circleX').value = "";
    document.getElementById('circleY').value = "";
    document.getElementById('radius').value = "";
}

// mid point algorithm to get all points of line
function drawLineShape() {
    var x0 = parseInt(document.getElementById('lineX0').value);
    var y0 = parseInt(document.getElementById('lineY0').value);
    var x1 = parseInt(document.getElementById('lineX1').value);
    var y1 = parseInt(document.getElementById('lineY1').value);
    lineMidPoint(x0, y0, x1, y1);
}

function lineMidPoint (x0,y0,x1,y1) {
     $("#shape").empty(); 
    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx-dy;

    while(true){
        drawPixel(x0,y0);
        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
    }
}

function clearLine() {
    $("#shape").empty();
    document.getElementById('lineX0').value = "";
    document.getElementById('lineY0').value = "";
    document.getElementById('lineX1').value = "";
    document.getElementById('lineY1').value = "";
}

// mid point algorithm to get all points of ellipse
function drawEllipseShape() {
    var xc = parseInt(document.getElementById('Xc').value);
    var yc = parseInt(document.getElementById('Yc').value);
    var a = parseInt(document.getElementById('ellipseA').value);
    var b = parseInt(document.getElementById('ellipseB').value);
    ellipseMidPoint(xc, yc, a, b);
}

function ellipsePlotPoints (xc,yc,  x,  y) {
    drawPixel(xc + x, yc + y);
    drawPixel(xc - x, yc + y);
    drawPixel(xc + x, yc - y);
    drawPixel(xc - x, yc - y);
}

function ellipseMidPoint(xc, yc, a, b) {
    $("#shape").empty();
    var a2 = a * a;
    var b2 = b * b;
    var twoa2 = 2 * a2;
    var twob2 = 2 * b2;
    var p;
    var x = 0;
    var y = b;
    var px = 0;
    var py = twoa2 * y;

    /* Plot the initial point in each quadrant. */
    ellipsePlotPoints (xc,yc, x, y);

    /* Region 1 */
    p = Math.round (b2 - (a2 * b) + (0.25 * a2));
    while (px < py) {
        x++;
        px += twob2;
        if (p < 0)
        p += b2 + px;
        else {
        y--;
        py -= twoa2;
        p += b2 + px - py;
        }
        ellipsePlotPoints (xc,yc, x, y);
    }

    /* Region 2 */
    p = Math.round (b2 * (x+0.5) * (x+0.5) + a2 * (y-1) * (y-1) - a2 * b2);
    while (y > 0) {
        y--;
        py -= twoa2;
        if (p > 0)
        p += a2 - py;
        else {
        x++;
        px += twob2;
        p += a2 - py + px;
        }
        ellipsePlotPoints (xc,yc, x, y);
    }
}

function clearEllipse() {
    $("#shape").empty();
    document.getElementById('Xc').value = "";
    document.getElementById('Yc').value = "";
    document.getElementById('ellipseA').value = "";
    document.getElementById('ellipseB').value = "";
}

function drawRectline(x0,y0,x1,y1) {
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;

   while(true){
    drawPixel(x0,y0);

     if ((x0==x1) && (y0==y1)) break;
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
}

function drawRectangleShape() {
    $("#shape").empty();
    var x = parseInt(document.getElementById('rectX').value);
    var y = parseInt(document.getElementById('rectY').value);
    var w = parseInt(document.getElementById('rectW').value);debugger
    var h = parseInt(document.getElementById('rectH').value);
    drawRectline(x, y, x+w, y);
    drawRectline(x, y, x, y+h);
    drawRectline(x, y+h, x+w, y+h);
    drawRectline(x+w, y, x+w, y+h);
}

function clearRectangle() {
    $("#shape").empty();
}

var polyCanvas = document.getElementById('polyCanvas');
var ctx = polyCanvas.getContext('2d');

function drawPolygonShape() {
    ctx.clearRect(0, 0, polyCanvas.width, polyCanvas.height);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100,50);
    ctx.lineTo(50, 100);
    ctx.lineTo(0, 90);
    ctx.closePath();
    ctx.fill();
}

function drawPolylineShape() {
    ctx.clearRect(0, 0, polyCanvas.width, polyCanvas.height);
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(20,100);
    ctx.lineTo(70,100);
    ctx.stroke(); 
}

function clearPolyShape() {
    ctx.clearRect(0, 0, polyCanvas.width, polyCanvas.height);
}

function drawPixel(mx,my) {
    $("#shape").append("<b style='left:"+mx+"px;top:"+my+"px'>.</b>");
}