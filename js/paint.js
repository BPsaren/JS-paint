// Declare Variables Globally
var canvas;             // HTML Element that IS the canvas  
var ctx;                // Context used to manipulate Canvas
var drawing = false;    // Is the user trying to draw?s
var dot = false;
var pX = pY = 0;        // Previous X and Y coordinate
var cX = cY = 0;        // Current X and Y coordinate
var width = 5;          // Width of line to draw
var color = "black";    // Color of line to draw
var cur_tool = "Black Pen"; // Current tool in use

// Start by Initializing the Canvas and EventListeners
//      INPUT: the ID of the canvas element
function init(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
    canvas.width = 889;
    canvas.height = 500;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Create Event Listener for Events we care to process
    // Moving mouse on canvas
    canvas.addEventListener("mousemove", function (e) {
        locatePointer('move', e);
    }, false);
    // Clicking mouse down on canvas
    canvas.addEventListener("mousedown", function (e) {
        locatePointer('click', e);
    }, false);
    // Lifting up mouse on canvas
    canvas.addEventListener("mouseup", function (e) {
        locatePointer('up', e);
    }, false);
    // Mouse leaving canvas
    canvas.addEventListener("mouseout", function (e) {
        locatePointer('out', e);
    }, false);

    canvas.addEventListener("mouseover", function(e) {
        if(e.shiftKey) {
            locatePointer('click', e);
        }
    }, false);
    changeTool();
}


// Function to Clear canvas entirely 
function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    console.log("Canvas Cleared");
}

// Locate Pointer on Canvas
// INPUTS: a -> action performed, e -> event object
function locatePointer(a, e) {
    if (a == 'click') {
        // Move current info to old information
        pX = cX;
        pY = cY;
        // Copy pointer location into cX and cY
        cX = e.clientX - canvas.getBoundingClientRect().left;
        cY = e.clientY - canvas.getBoundingClientRect().top;
        // Indicate user has started drawing
        drawing = true;
        //console.log("Click Start: " + cX + "," + cY);
        dot = true;
        if (dot) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(cX, cY, width, width);
            ctx.closePath();
            dot = false;
        }

    } else if (a == "up" || a == "out") { // If mouse is lifted/leaves canvas
        // Indicate user is no longer drawing
        drawing = false;
    } else if (a == "move") {
        if (drawing) {
            // Move current info to old information
            pX = cX;
            pY = cY;
            // Copy pointer location into cX and cY
            cX = e.clientX - canvas.getBoundingClientRect().left;
            cY = e.clientY - canvas.getBoundingClientRect().top;
            //console.log("Moved to: " + cX + "," + cY);
            // Draw at new Location
            draw();
        }
    }
}

// Draw a line from pX,pY to cX,cY
function draw() {
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}

// Set the color of the line 
// INPUT: c -> integer corresponding to a color
function lineColor(c) {
    switch (c) {
        case 0:
            color = "white";
            cur_tool = "White Pen";
            break;
        case 1:
            color = "black";
            cur_tool = "Black Pen";
            break;
        case 2: 
            color = "blue";
            cur_tool = "Blue Pen";
            break;
        case 3: 
            color = "green";
            cur_tool = "Green Pen";
            break;
        case 4: 
            color = "red";
            cur_tool = "Red Pen";
            break;
        case 5:
            color = "yellow";
            cur_tool = "Yellow Pen";
            break;
        case 6: 
            color = "orange";
            cur_tool = "Orange Pen";
            break;
        case 7:
            color = "pink";
            cur_tool = "Pink Pen";
            break;
        case 8:
            color = "brown";
            cur_tool = "Brown Pen";
            break;
        case 9:
            color = "white";
            cur_tool = "Eraser";
            break;
        default:
            color = "white";
            cur_tool = "White Pen";
            console.warn("lineColor recieved unknown input: " + c + ". Defaulting to White");
            return;
    }
    console.log("lineColor() called, color: " + color);
    changeTool();
    return;
}

function strokeForm() {
    var input = document.getElementById("lineStroke").value;
    strokeWidth(input);
}
// Set the stroke of the line
// INPUT: s -> integer pixel size for line
function strokeWidth(s) {
    width = s;
}

// Save the canvas as a PNG
function downloadCanvas() {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } else {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    }
}

function changeTool() {
    var toolHeader = document.getElementById("tool");
    toolHeader.innerText = "Current Tool: " + cur_tool;
}