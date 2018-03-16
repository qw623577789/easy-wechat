module.exports = class {
    constructor(type, mediaId){
        this.mediaId = '';
        this.type = '';
    }

    toWechatAttr(){
        
    }

    toJson(){

    }

    fromJson(json){

    }

    static get Text () {return require('./text.js');}
    static get Article () {return require('./article.js');}
    static get Image () {return require('./image.js');}
    static get Music () {return require('./music.js');}
    static get Video () {return require('./video.js');}
    static get Voice () {return require('./voice.js');}
}