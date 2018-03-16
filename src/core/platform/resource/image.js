const Resource = require('./index.js');
module.exports = class ImageResource extends Resource{
    constructor(mediaId){
        let type = "image";
        super(type, mediaId);
        this._mediaId =  mediaId;
        this._type = type;
    }

    toWechatAttr(){
        return [{MsgType:{_cdata:this._type}}, {Image:[{MediaId:{_cdata:this._mediaId}}]}]
    }
}