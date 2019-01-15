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

    if (lastPoint !== null) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(lastPoint.x + ((canvas.width / 2) - lastPoint.x) * 2, lastPoint.y);
        ctx.lineTo(mouseX + ((canvas.width / 2) - mouseX) * 2, mouseY);
        ctx.closePath();
        ctx.stroke();


    }
    else {
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(mouseX, mouseY);
        ctx.closePath();
        ctx.stroke();
    }
}

function updateOptions() {
    OptionMenu.color = document.querySelector("#color-picker input").value;
    OptionMenu.brushSize = document.querySelector("#brush-size input").value;
}

function fillCanvas() {
    ctx.fillStyle = OptionMenu.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
