
import expect from 'expect';
import command from './Command';

describe('Command', function() {

	it('should reject Command with illegal class name', function() {
		class CMDMock {
		}
		let cmd = new CMDMock();
		expect( () => { command.register(cmd) } ).toThrow("bad class name");
	});


	it('execute cmd with data', function() {
		class CmdMock {
			constructor() {
				this._executeCount = 0;
			}
			execute(data) {
				this._data = data;
				this._executeCount++;
			}
		}
		let cmdMock = new CmdMock();

		command.register(cmdMock);

		let data = { x: 4711, text:"hallo"};
		command.execute("Mock", data);
		expect(cmdMock._executeCount).toBe(1);
		expect(cmdMock._data.x).toBe( data.x );
		expect(cmdMock._data.text).toBe( data.text );

		command.execute("Mock", data);
		expect(cmdMock._executeCount).toBe(2);

	});
});