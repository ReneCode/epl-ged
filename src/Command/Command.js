

class Command {
	constructor() {
		this._mapCommand = {};
	}

	register(cmd) {
		let name = cmd.constructor.name;

		if (name.slice(0,3) != "Cmd") {
			throw new Error("bad class name");
		}
		// remove "Cmd" at the start of the name
		name = name.slice(3);
		this._mapCommand[name] = cmd;
	}

	execute(command, data) {
		let cmd = this._mapCommand[command];
		if (cmd  &&  cmd.execute) {
			cmd.execute(data);
		}
	}
}


export default new Command();
