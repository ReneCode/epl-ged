
var CanvasInteraction = function() {
    this.click = function(evt) {
        console.log("click");
    };

    this.mousemove = function(evt) {
    }
};

var CrossHairInteraction = function(ctx, boundingRect, redrawCallback) {
    this.ctx = ctx;
    this.boundingRect = boundingRect;
    this.redrawCallback = redrawCallback;
    
    this.mousemove = function(evt) {
        var x = evt.clientX - this.boundingRect.left;
        var y = evt.clientY - this.boundingRect.top;
        ctx.strokeStyle = "#666";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.boundingRect.height);
        ctx.moveTo(0, y);
        ctx.lineTo(this.boundingRect.width, y);
        ctx.stroke();

        this.redrawCallback();
    }
}



var interactionList = [];
interactionList.push( new CanvasInteraction() );

var canvas = $("#canvas")[0];
var rect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d");

var bufferCanvas = document.createElement('canvas');
bufferCanvas.width = canvas.width;
bufferCanvas.height = canvas.height;

var ctxBuffer = bufferCanvas.getContext("2d"); 


var redrawCanvas = function() {
    ctx.drawImage(bufferCanvas, 0, 0);
    ctxBuffer.fillStyle = "#eee";
    ctxBuffer.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
}

var redraw = function () {
    redrawCanvas();
}

interactionList.push( new CrossHairInteraction(ctxBuffer, rect, redraw));


$("#canvas").on("click", function(evt) {
    evt.preventDefault();
    interactionList.forEach(function(interaction) {
        if (interaction.click) {
            interaction.click(evt);
        }
    })
});


$("#canvas").on("mousemove", function(evt) {
    evt.preventDefault();
    interactionList.forEach(function(interaction) {
        if (interaction.mousemove) {
            interaction.mousemove(evt);
        }
    })
});

window.addEventListener("resize", function() {
    $('#canvas').width = window.innerWidth;
    $('#canvas').height = window.innerHeight;
});

