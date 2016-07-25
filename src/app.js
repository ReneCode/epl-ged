
import drawCanvas  from './DrawCanvas';
import databaseStore from './DatabaseStore';
import iaManager from './ia/IaManager';
import EventPoint from './ia/EventPoint';
import Point from './Point';
import Coordinate from './common/Coordinate';

import * as types from './ia/actionTypes';

let coorinateTransform = new Coordinate();
let canvas = $("#canvas")[0];
var rect = canvas.getBoundingClientRect();
var targetCtx = canvas.getContext('2d');
coorinateTransform.setDevice(rect.right - rect.left,
							rect.bottom - rect.top);
coorinateTransform.setViewport(0,0,1000,1000);

drawCanvas.init(targetCtx);
drawCanvas.resize(rect.right - rect.left, 
				rect.bottom - rect.top);

databaseStore.init();

reloadCanvas();

let eventPoint = new EventPoint(canvas);


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
	evt.preventDefault();
	iaManager.dispatch( {type: types.EventKeyPress, 
						 keyCode: evt.keyCode });
});



$("#aclear").on("click", function(evt) {
	databaseStore.deleteAll( function() {
		databaseStore.commit();
	});
});




$("#ialine").on("click", function(evt) {
	iaManager.clearIaStack();
	iaManager.start("IaLine");
});

$("#iarectangle").on("click", function(evt) {
	iaManager.clearIaStack();
	iaManager.start("IaRectangle");
});

$("#iasymbol").on("click", function(evt) {
	iaManager.clearIaStack();
	iaManager.start("IaSymbol");
});