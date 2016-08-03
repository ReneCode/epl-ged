import graphicDisplay from '../graphic/GraphicDisplay';
import databaseStore from '../DatabaseStore';

class CmdZoom {
	execute(view) {
		// set device view
		graphicDisplay.setViewport(view);
		databaseStore.redraw();
	}
}

export default CmdZoom;

