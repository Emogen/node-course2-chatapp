const expect = new require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate the correct message object',()=>{
		from = 'test';
		text = 'Text from test';

		res = generateMessage(from,text);

		expect(res).toMatchObject({from,text});
		expect(typeof res.createdAt).toBe('number');
	});
});