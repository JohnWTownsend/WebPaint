var canvas;
var ctx;
var hold = false;
var interval;
var mouseX, mouseY;
var windowHeightOffset, windowWidthOffset;
var color, brushSize;
var lastPoint;

var OptionMenu;



document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("paint-canvas");
    ctx = canvas.getContext('2d');


    OptionMenu = {
        color: "black",
        size: 20,
        fillButton: document.querySelector("#fill input"),
    };

    OptionMenu.fillButton.addEventListener("click", fillCanvas);

    optionsList = document.querySelectorAll("#options-menu .option input");
    for (var i = 0; i < optionsList.length; i++) {
        optionsList[i].addEventListener("change", updateOptions);
    }

    updateCanvasSize();
    updateOptions();

    canvas.addEventListener("resize", updateCanvasSize);
    canvas.addEventListener("mousedown", mouseDownCanvas);
    canvas.addEventListener("mouseup", mouseUpCanvas);
    canvas.addEventListener("mousemove", mouseMoveCanvas);
    canvas.addEventListener("mouseleave", mouseUpCanvas);
    canvas.addEventListener("mouseover", function () {
        interval = setInterval(function () { if (hold === true) mouseOverCanvas(); }, 10)
    });
    canvas.addEventListener("mouseout", function () { clearInterval(interval) });
});

function updateCanvasSize() {
    canvas.height = window.innerHeight * .9;
    canvas.width = window.innerWidth;
    windowHeightOffset = window.innerHeight - canvas.height;
    windowWidthOffset = window.innerWidth - canvas.width;
}

function mouseDownCanvas() {
    hold = true;
}
function mouseUpCanvas() {
    hold = false;
    lastPoint = null;
}
function mouseMoveCanvas(e) {
    lastPoint = {
        x: mouseX,
        y: mouseY
    };
    mouseX = e.clientX;
    mouseY = e.clientY - windowHeightOffset;
}

function mouseOverCanvas() {
    ctx.strokeStyle = OptionMenu.color;
    ctx.lineWidth = OptionMenu.brushSize;
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (lastPoint !== null) {
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(mouseX, mouseY);
    }
    else {
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseX, mouseY);
    }
    ctx.closePath();
    ctx.stroke();
}

function updateOptions() {
    OptionMenu.color = document.querySelector("#color-picker input").value;
    OptionMenu.brushSize = document.querySelector("#brush-size input").value;
}

function fillCanvas() {
    ctx.fillStyle = OptionMenu.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
