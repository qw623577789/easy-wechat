module.exports = class VoiceResource {
    constructor(mediaId){
        this._mediaId =  mediaId;
        this._type = "voice";
    }

    toWechatAttr(){
        return [
            {
                MsgType:{_cdata:this._type}
            }, 
            {
                MediaId:{_cdata: this._mediaId}
            }
        ]
    }
}