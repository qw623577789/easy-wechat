
const dateFormat = require('dateformat');
const fsx = require('fs-extra');
const fs = require('fs');

module.exports = class {
    constructor(fileDir){
        this._fileDir = fileDir;
    }

    runtime(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text.replace(/\n/g,'')}`;
        if (this._fileDir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._fileDir + "/runtime", log);
        }
    }

    package(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text.replace(/\n/g,'')}`;
        if (this._fileDir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._fileDir + "/package", log);
        }
    }    
    
    error(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text.replace(/\n/g,'')}`;
        if (this._fileDir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._fileDir + "/error", log);
        }
    }

    _writeToFile(fileDir, log) {
		let filename = `${fileDir}/${dateFormat(new Date(), 'yyyy-mm-dd')}.log`;
		fsx.ensureFile(filename, (err) => {
			fs.appendFile(filename, `${log}\n`, () => {});
		});
    }
    
}