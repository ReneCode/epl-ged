
import CmdZoom from './CmdZoom';

import command from './Command';

class CommandRegister {

	registerAllCommands() {
		command.register( new CmdZoom() );

	}
}

export default CommandRegister;