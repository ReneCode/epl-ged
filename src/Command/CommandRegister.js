

class CommandRegister {
	register() {

		this.register( new (require('./CmdZoom').default)() );

	}
}


export default CommandRegister;