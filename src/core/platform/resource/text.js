module.exports = class TextResource{
    constructor(text){
        this._text =  text;
        this._type = "text";
    }

    toWechatAttr(){
        return [{MsgType:{_cdata:this._type}}, {Content:{_cdata:this._text}}]
    }
}