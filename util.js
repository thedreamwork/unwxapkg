'use strict';

module.exports = {
    /**
	 * 判断两个数组是否相等
	 * @param  {Array}   a 数组a
	 * @param  {Array}   b 数组b
	 * @return {Boolean}   判断结果
	 */
	equal(a, b) {
		if(a.length !== b.length) return false;

		for(let i=0, len=a.length; i<len; i++) {
			if(a[i] !== b[i]) return false;
		}

		return true;
	},
    /**
	 * 读取32位无符号整型数
	 * @param  {Array}  buffer buffer数组
	 * @param  {Number} offset 偏移量
	 * @return {Number}        读取到的整型数
	 */
	readInt32(buffer, offset) {
		offset = offset || 0;
		return (buffer[offset] << 24) + (buffer[offset + 1] << 16) + (buffer[offset + 2] << 8) + (buffer[offset + 3] << 0);
	},

	/**
	 * 读取16位无符号整型数
	 * @param  {Array}  buffer buffer数组
	 * @param  {Number} offset 偏移量
	 * @return {Number}        读取到的整型数
	 */
	readInt16(buffer, offset) {
		offset = offset || 0;
		return (buffer[offset] << 8) + (buffer[offset + 1] << 0);
	},

    /**
	 * 读取8位无符号整型数
	 * @param  {Array}  buffer buffer数组
	 * @param  {Number} offset 偏移量
	 * @return {Number}        读取到的整型数
	 */
	readInt8(buffer, offset) {
		offset = offset || 0;
		return buffer[offset] << 0;
	},

	/**
	 * 将buffer数组转为字符串
	 * @param  {Array}  buffer buffer数组
	 * @return {String}        字符串
	 */
	bufferToString(buffer) {
		let str = '';
		for(let i=0, len=buffer.length; i<len; i++){
			str += String.fromCharCode(buffer[i]);
		}
		return str;
	},

    /**
	 * 将字符串转为buffer数组
	 * @param  {String}   str 字符串
	 * @return {Array}        buffer数组
	 */
	stringToBuffer(str) {
		let buffer = Buffer.alloc(str.length, 0xFF);
		str.forEach((char, index) => {
			buffer[index] = char.charCodeAt(0) & 0xFF;
		});

		return buffer;
	},

    /**
	 * 读取buffer数组的指定字节数
	 * @param  {Array}  buffer buffer数组
	 * @param  {Number} begin  开始游标
	 * @param  {Number} length 读取长度
	 * @return {Array}         读取到的数据
	 */
	readBytes(buffer, begin, length) {
		let end = begin + length;
		if(end > buffer.length) {
			throw new Error('读取的长度超出了buffer数组的界限！');
		}

		return buffer.slice(begin, end);
	},

}