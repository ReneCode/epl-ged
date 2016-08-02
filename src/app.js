
import databaseStore from './DatabaseStore';
import iaManager from './ia/IaManager';
import IaRegister from './ia/IaRegister';
import Point from './Point';
import ConfigMenu from './menu/ConfigMenu';
import graphicDisplay from './graphic/GraphicDisplay';
import CommandRegister from './command/CommandRegister';

import * as types from './ia/actionTypes';


let commandRegister = new CommandRegister();
commandRegister.registerAllCommands();

let configMenu = new ConfigMenu();
configMenu.setMenu( require('./menu/main-menu.json'));

let iaRegister = new IaRegister(iaManager); 

//let canvas = ;
graphicDisplay.init($("#canvas")[0]);
/*
var targetCtx = canvas.getContext('2d');
let coorinateTransform = new CoordinateTransform();
coorinateTransform.setViewport(0,0,1000,1000);

let drawCanvas = new DrawCanvas();
drawCanvas.init(targetCtx, coorinateTransform);
*/
databaseStore.init();

reloadCanvas();

//let eventPoint = new EventPoint(canvas);

$(document).ready( function() {
	graphicDisplay.resizeCanvas();
});


/*
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
*/

function reloadCanvas() {
	databaseStore.load( function() {
		databaseStore.commit();
	});
}


$(window).resize(function() {
	console.log("resize");
	graphicDisplay.resizeCanvas();

/*
	setTimeout( () => {

	}, 500);
*/
	/*// debugger;	
	resizeCanvas();
	setTimeout( () => {
		// debugger;
		drawCanvas.setDirty();
		drawCanvas.show();
	}, 500);
	*/
});


$("#canvas").on("mousemove", function(evt) {
	evt.preventDefault();

	let pt = graphicDisplay.getDevicePoint(evt);
	pt = graphicDisplay.transformDeviceToWorld(pt);

	iaManager.dispatch( {type: types.EventMouseMove, 
						event: {point:pt} } );

	databaseStore.commit();
});

$("#canvas").on("click", function(evt) {
	evt.preventDefault();

	let pt = graphicDisplay.getDevicePoint(evt);
	pt = graphicDisplay.transformDeviceToWorld(pt);

	iaManager.dispatch( {type: types.EventLMouseClick, 
						event: {point:pt} } );

	databaseStore.commit();
});

$(document).on("keydown", function(evt) {
	iaManager.dispatch( {type: types.EventKeyPress, 
						 keyCode: evt.keyCode });
});



