
import { drawCanvas } from './DrawCanvas';
import { databaseStore } from './DatabaseStore';
import { iaManager } from './ia/IaManager';
import { EventPoint } from './ia/EventPoint';
import { Point } from './Point';

import * as types from './ia/actionTypes';

let canvas = $("#canvas")[0];
var rect = canvas.getBoundingClientRect();
var targetCtx = canvas.getContext('2d');

drawCanvas.init(targetCtx);
drawCanvas.resize(rect.right - rect.left, 
				rect.bottom - rect.top);

databaseStore.init();

reloadCanvas();

let eventPoint = new EventPoint(rect);


function reloadCanvas() {
	databaseStore.load( function() {
		databaseStore.commit();
	});
}

function redraw() {
	drawCanvas.redraw(targetCtx);
}

$("#canvas").on("mousemove", function(evt) {
	evt.preventDefault();

	let pt = eventPoint.getPoint(evt);
	iaManager.dispatch( {type: types.EventMouseMove, 
						event: {point:pt} } );

	databaseStore.commit();
});

$("#canvas").on("click", function(evt) {
	evt.preventDefault();
	let pt = eventPoint.getPoint(evt);
	iaManager.dispatch( {type: types.EventLMouseClick, 
						event: {point:pt} } );

	databaseStore.commit();
});

$("#canvas").on("keydown", function(evt) {

});



$("#aclear").on("click", function(evt) {
	databaseStore.deleteAll( function() {
		databaseStore.commit();
	});
});




$("#ialine").on("click", function(evt) {
	iaManager.start("IaLine");
});

$("#iarectangle").on("click", function(evt) {
	iaManager.start("IaRectangle");
});