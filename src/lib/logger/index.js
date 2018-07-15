
const dateFormat = require('dateformat');
const fsx = require('fs-extra');
const fs = require('fs');

module.exports = class {
    constructor(dir){
        this._dir = dir;
    }

    get logDir() {
        return this._dir
    }

    runtime(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text.replace(/\n/g,'')}`;
        if (this._dir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._dir + "/runtime", log);
        }
    }

    package(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text}`;
        if (this._dir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._dir + "/package", log);
        }
    }    
    
    error(text){
        let timeStr = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss,l');
        let log = `[${timeStr}]${text.replace(/\n/g,'')}`;
        if (this._dir == undefined) {
            console.log(log);
        }
        else {
            this._writeToFile(this._dir + "/error", log);
        }
    }

    _writeToFile(dir, log) {
		let filename = `${dir}/${dateFormat(new Date(), 'yyyy-mm-dd')}.log`;
		fsx.ensureFile(filename, (err) => {
			fs.appendFile(filename, `${log}\n`, () => {});
		});
    }
    
}