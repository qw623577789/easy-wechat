const Resource = require('./index.js');
module.exports = class VoiceResource extends Resource{
    constructor(mediaId){
        let type = "voice";
        super(type, mediaId);
        this._mediaId =  mediaId;
        this._type = type;
    }

    toWechatAttr(){
        return [
            {
                MsgType:{_cdata:this._type}
            }, 
            {
                Voice:[
                    {MediaId:{_cdata:this._mediaId}},
                ]
            }
        ]
    }
}