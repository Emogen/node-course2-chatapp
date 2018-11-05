const expect = new require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate the correct message object',()=>{
		from = 'test';
		text = 'Text from test';

		res = generateMessage(from,text);

		expect(res).toMatchObject({from,text});
		expect(typeof res.createdAt).toBe('number');
	});
});

describe('generateLocationMessage',()=>{
	it('should generate correct location object',()=>{
		from = 'test';
		longitude = 1;
		latitude = 1;
		expectedUrl = `https://www.google.com/maps/?q=${latitude},${longitude}`;

		res = generateLocationMessage(from,latitude,longitude);

		expect(res.url).toBe(expectedUrl);
		expect(res).toMatchObject({
			from,
			url: expectedUrl
		});
		expect(typeof res.createdAt).toBe('number');
	});
});
