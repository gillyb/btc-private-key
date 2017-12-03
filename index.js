// Algorithm taken from here : https://bitcointalk.org/index.php?topic=1716322.0
const bigInt = require('big-integer');
const sha256 = require('sha256');
const base58 = require('bs58');

module.exports = {

	from: (input) => {

		input = input.toString();

		var padding = '0000000000000000000000000000000000000000000000000000000000000000';

		var hexNum = parseInt(input, 16).toString();
		var paddedNum = padding.substr(0, padding.length - hexNum.length) + hexNum;

		var buffer = Buffer.from('80' + paddedNum, 'hex');

		let postSha = sha256.x2(buffer);

		let prefix = postSha.substr(0, 8);

		let newBuffer = Buffer.from('80' + paddedNum + prefix, 'hex');

		return base58.encode(newBuffer);
	}

}