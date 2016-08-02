
import graphicDisplay from '../graphic/GraphicDisplay';

class CmdZoom {
	execute(data) {
		// set device view
		graphicDisplay.setViewport(data.x, data.y,
						data.x + data.w, data.y + data.h);
		graphicDisplay.resizeCanvas();

	}
}

export default CmdZoom;