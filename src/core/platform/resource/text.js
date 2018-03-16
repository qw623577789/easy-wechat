const Resource = require('./index.js');
module.exports = class TextResource extends Resource{
    constructor(text){
        let type = "text";
        super(type, "");
        this._text =  text;
        this._type = type;
    }

    toWechatAttr(){
        return [{MsgType:{_cdata:this._type}}, {Content:{_cdata:this._text}}]
    }
}