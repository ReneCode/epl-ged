
import { InteractionList } from './InteractionList.js'
import { TraceCoordinateInteraction } from './ia/TraceCoordinateInteraction.js'
import { LineInteraction } from './ia/LineInteraction.js'

import { drawCanvas } from './DrawCanvas.js'
import { databaseStore } from './DatabaseStore.js'

let canvas = $("#canvas")[0];
var rect = canvas.getBoundingClientRect();
var targetCtx = canvas.getContext('2d');

drawCanvas.init(targetCtx);
drawCanvas.resize(rect.right - rect.left, 
				rect.bottom - rect.top);

databaseStore.init();

reloadCanvas();

let interactionList = new InteractionList(rect);

//interactionList.add(new TraceCoordinateInteraction());
interactionList.add(new LineInteraction());


function reloadCanvas() {
	databaseStore.load( function() {
		databaseStore.commit();
	});
}

function redraw() {
	drawCanvas.redraw(targetCtx);
}

$("#canvas").on("mousemove", function(evt) {
	interactionList.mousemove(evt);

	databaseStore.commit();
});

$("#canvas").on("click", function(evt) {
	interactionList.click(evt);
	databaseStore.commit();
})


$("#aclear").on("click", function(evt) {
	databaseStore.deleteAll( function() {
		databaseStore.commit();
	});
});
