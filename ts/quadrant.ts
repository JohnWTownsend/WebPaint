import {OptionMenu} from "./OptionMenu";

var canvas;
var ctx;
var hold = false;
var interval;
var mouseX, mouseY;
var windowHeightOffset, windowWidthOffset;
var lastPoint;





document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("paint-canvas");
    ctx = canvas.getContext('2d');

    let x = setInterval(updateOptions, 10);

    let optionMenu = new OptionMenu("black", 20);

    OptionMenu.fillButton.addEventListener("click", fillCanvas);

    optionsList = document.querySelectorAll("#options-menu .option input");
    for (var i = 0; i < optionsList.length; i++) {
        optionsList[i].addEventListener("change", updateOptions);
    }

    updateCanvasSize();
    updateOptions();

    window.addEventListener("resize", updateCanvasSize);
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

    if (lastPoint !== null) {
        drawLine(lastPoint, { x: mouseX, y: mouseY });
        drawLine(
            { x: lastPoint.x, y: lastPoint.y + ((canvas.height / 2) - lastPoint.y) * 2 },
            { x: mouseX, y: mouseY + ((canvas.height / 2) - mouseY) * 2 }
        );
        drawLine(
            { x: lastPoint.x + ((canvas.width / 2) - lastPoint.x) * 2, y: lastPoint.y },
            { x: mouseX + ((canvas.width / 2) - mouseX) * 2, y: mouseY }
        );
        drawLine(
            { x: lastPoint.x + ((canvas.width / 2) - lastPoint.x) * 2, y: lastPoint.y + ((canvas.height / 2) - lastPoint.y) * 2 },
            { x: mouseX + ((canvas.width / 2) - mouseX) * 2, y: mouseY + ((canvas.height / 2) - mouseY) * 2 }
        );
    }
    else {
        drawLine({ x: mouseX, y: mouseY }, { x: mouseX, y: mouseY });
    }

}

function drawLine(from, to) {
    ctx.strokeStyle = OptionMenu.color;
    ctx.lineWidth = OptionMenu.brushSize;
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.closePath();
    ctx.stroke();
}

function updateOptions() {
    OptionMenu.color = getRandomColor();
    OptionMenu.brushSize = document.querySelector("#brush-size input").value;
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 1000 % 256);
    var g = Math.floor(Math.random() * 1000 % 256)
    var b = Math.floor(Math.random() * 1000 % 256)
    let color = `rgb(${r},${g},${b})`;
    return color;
}


