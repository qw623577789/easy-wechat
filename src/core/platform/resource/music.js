module.exports = class MusicResource{
    constructor(thumbMediaId, title = undefined, description = undefined, musicUrl = undefined, hqMusicUrl = undefined){
        this._title =  title;
        this._description =  description;
        this._musicUrl =  musicUrl;
        this._hqMusicUrl =  hqMusicUrl;
        this._thumbMediaId =  thumbMediaId;
        this._type = "music";
    }

    toWechatAttr(){
        let attr = [
            {
                MsgType: {_cdata:this._type}
            }, 
            {
                ThumbMediaId: {_cdata:this._thumbMediaId}
            }
        ]

        if (this._title != undefined) {
            attr.push({
                Title: {_cdata: this._title}
            })
        }

        if (this._description != undefined) {
            attr.push({
                Description: {_cdata: this._description}
            })
        }

        if (this._musicUrl != undefined) {
            attr.push({
                MusicURL: {_cdata: this._musicUrl}
            })
        }

        if (this._hqMusicUrl != undefined) {
            attr.push({
                HQMusicUrl: {_cdata: this._hqMusicUrl}
            })
        }

        return attr;
    }
}