
import { InteractionList } from './InteractionList.js'
import { TraceCoordinateInteraction } from './ia/TraceCoordinateInteraction.js'
import { LineInteraction } from './ia/LineInteraction.js'

import { DrawCanvas } from './DrawCanvas.js'
import { databaseStore } from './DatabaseStore.js'

let canvas = $("#canvas")[0];
var rect = canvas.getBoundingClientRect();
var targetCtx = canvas.getContext('2d');

let drawCanvas = new DrawCanvas(rect.right - rect.left, 
								rect.bottom - rect.top);

databaseStore.init(drawCanvas);
databaseStore.load( function() {
	databaseStore.drawItems(drawCanvas);
	drawCanvas.redraw(targetCtx);
});

let interactionList = new InteractionList(rect);

//interactionList.add(new TraceCoordinateInteraction());
interactionList.add(new LineInteraction(drawCanvas));

$("#canvas").on("mousemove", function(evt) {
	interactionList.mousemove(evt);

	databaseStore.drawItems(drawCanvas);
	drawCanvas.redraw(targetCtx);
});

$("#canvas").on("click", function(evt) {
	interactionList.click(evt);

	databaseStore.drawItems(drawCanvas);

	drawCanvas.redraw(targetCtx);
})


$("#aclear").on("click", function(evt) {

});


/*




document.getElementById("test").addEventListener("click", function() {
	console.log("CLOCK");

	System.import('/src/clock.js').then(function(m) {
		console.log("loaded clock");

		let clo = m.Clock(45);
	});


});

	let o = new Output();


//import { test } from './output.js';

var x = 42;
let y = 44;

//console.log(test);

console.log("it works!", x, y);

*/
