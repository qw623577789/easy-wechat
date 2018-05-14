module.exports = class ImageResource{
    constructor(mediaId){
        this._mediaId =  mediaId;
        this._type = "image";
    }

    toWechatAttr(){
        return [
            {
                MsgType: {_cdata:this._type}
            }, 
            {
                MediaId: {_cdata: this._mediaId}
            }
        ]
    }
}