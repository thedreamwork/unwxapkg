'use strict';

const _ = require('./util');

const DEFAULT = {
    firstMark : [0xBE],
    lastMark : [0xED],

}


function wxapkgFileInfo(){
    this.nameLen = 0;
    this.name = "";
    this.offset = 0;
    this.size = 0;
}

class Wxapkg{
    constructor(file){
        this.index = 0; // 解码游标
        this.buffer = new Uint8Array(file);
    }

    /**
	 * 读取buffer数组的指定字节数
	 * @param  {Number} length 读取长度
	 * @return {Array}         读取到的数据
	 */
	readBytes(length) {
		let buffer = _.readBytes(this.buffer, this.index, length);
		this.index += length;

		return buffer;
	}

    /**
	 * 解码
	 * @return {Array}        文件数组
	 */
	_decode() {
        if(!this.buffer) {
			throw new Error('不存在待解码数据！');
		}
        this._decodeHeader();     // 解析头部信息
        return this._decodeChunkInfo();  // 解析数据块元数据
    }

    /**
	 * 解码输出文件
	 * @return {Void}
	 */
     decode() {
        let files = [];
        let fileInfoList = this._decode();
        fileInfoList.forEach((f)=>{
            let file = {};
            file.chunk = _.readBytes(this.buffer, f.offset, f.size);
            file.name = f.name;
            files.push(file);
        })
        return files;
     }

    /**
	 * 解码头部信息
	 * @return {Void}
	 */
	_decodeHeader() {
		if(this.index !== 0) {
			throw new Error('index属性指向非0！');
		}

		this.firstMark = this.readBytes(1);
        if(!_.equal(this.firstMark, DEFAULT.firstMark)) {
			throw new Error('wxpakg文件错误 - firstMark')
		}

		this.fileInfo = _.readInt32(this.readBytes(4));

        this.indexInfoLength = _.readInt32(this.readBytes(4));

        this.bodyInfoLength = _.readInt32(this.readBytes(4));

        this.lastMark = this.readBytes(1);

        if(!_.equal(this.lastMark, DEFAULT.lastMark)) {
			throw new Error('wxpakg文件错误 - lastMark')
		}

        this.fileCount = _.readInt32(this.readBytes(4));

        console.log(`fileCount = ${this.fileCount}`)
	}

    /**
     * 解析元数据
	 * @return {Array} 数据块元数据数组
	 */
	_decodeChunkInfo() {
        let fileList = [];
        for (let i = 0; i < this.fileCount; i++){
            let fileInfo = new wxapkgFileInfo;
            fileInfo.nameLen = _.readInt32(this.readBytes(4));
            fileInfo.name = _.bufferToString(this.readBytes(fileInfo.nameLen))
            fileInfo.offset = _.readInt32(this.readBytes(4));
            fileInfo.size = _.readInt32(this.readBytes(4));

            console.log(`fileName - ${fileInfo.name}`)

            fileList.push(fileInfo);
        }
        return fileList;
    }
}

module.exports = Wxapkg;

