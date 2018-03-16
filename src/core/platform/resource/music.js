const Resource = require('./index.js');
module.exports = class MusicResource extends Resource{
    constructor(mediaId, title, description, musicUrl, hqMusicUrl, thumbMediaId){
        let type = "music";
        super(type, mediaId);
        this._mediaId =  mediaId;
        this._title =  title;
        this._description =  description;
        this._musicUrl =  musicUrl;
        this._hqMusicUrl =  hqMusicUrl;
        this._thumbMediaId =  thumbMediaId;
        this._type = type;
    }

    toWechatAttr(){
        return [
            {
                MsgType:{_cdata:this._type}
            }, 
            {
                Video:[
                    {ThumbMediaId:{_cdata:this._mediaId}},
                    {Title:{_cdata:this._title}},
                    {Description:{_cdata:this._description}},
                    {MusicURL:{_cdata:this._musicUrl}},
                    {HQMusicUrl:{_cdata:this._hqMusicUrl}},
                    {Description:{_cdata:this._description}}
                ]
            }
        ]
    }
}