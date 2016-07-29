
import drawCanvas  from './DrawCanvas';
import databaseStore from './DatabaseStore';
import iaManager from './ia/IaManager';
import EventPoint from './ia/EventPoint';
import Point from './Point';
import Coordinate from './common/Coordinate';

import * as types from './ia/actionTypes';


let canvas = $("#canvas")[0];
var targetCtx = canvas.getContext('2d');
let coorinateTransform = new Coordinate();
coorinateTransform.setViewport(0,0,1000,1000);

drawCanvas.init(targetCtx, coorinateTransform);

databaseStore.init();

reloadCanvas();

let eventPoint = new EventPoint(canvas);

$(document).ready( function() {
	resizeCanvas();
});


function resizeCanvas() {
	// strech canvas to the full size of the div 'article'
	$("#canvas").attr( 'width', $("article").width() );
	$("#canvas").attr( 'height', $("article").height() );

	let rect = canvas.getBoundingClientRect();
	coorinateTransform.setDevice(rect.right - rect.left,  
							rect.bottom - rect.top);

	drawCanvas.resize(rect.right - rect.left, 
				rect.bottom - rect.top);
}


function reloadCanvas() {
	databaseStore.load( function() {
		databaseStore.commit();
	});
}


$(window).resize(function() {
	// debugger;	
	resizeCanvas();
	setTimeout( () => {
		// debugger;
		drawCanvas.setDirty();
		drawCanvas.show();
	}, 500);
});
$("#canvas").on("mousemove", function(evt) {
	evt.preventDefault();

	let pt = eventPoint.getPoint(evt);
	pt = coorinateTransform.deviceToWorld(pt);

	iaManager.dispatch( {type: types.EventMouseMove, 
						event: {point:pt} } );

	databaseStore.commit();
});

$("#canvas").on("click", function(evt) {
	evt.preventDefault();

	let pt = eventPoint.getPoint(evt);
	pt = coorinateTransform.deviceToWorld(pt);

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