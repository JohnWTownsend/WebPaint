var canvas;
var ctx;
var hold = false;
var interval;

document.addEventListener("DOMContentLoaded", function(){
    canvas = document.querySelector("#paint-canvas");
    ctx = canvas.getContext('2d');
    canvas.addEventListener("mousedown", mouseDownCanvas);
    canvas.addEventListener("mouseup", mouseUpCanvas);
    canvas.addEventListener("mouseover", function(){interval = setInterval(function(){mouseOverCanvas();}, 100);});
    canvas.addEventListener("mouseout", function(){clearInterval(interval)});
});

function mouseDownCanvas(){
    hold = true;
    console.log("mousedown");
}
function mouseUpCanvas(){
    hold = false;
    console.log("mouseup");
}
function mouseOverCanvas(e){
    console.log("mouseover");

    if(hold === true){
        var color = document.querySelector("#color-picker");
        var size = document.querySelector("#brush-size");
        ctx.fillStyle = color.value;
        ctx.fillRect(e.pageX, e.pageY, size, size);
    }
}

