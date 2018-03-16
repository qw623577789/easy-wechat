const Resource = require('./index.js');
module.exports = class VideoResource extends Resource{
    constructor(mediaId, title, description){
        let type = "video";
        super(type, mediaId);
        this._mediaId =  mediaId;
        this._title =  title;
        this._description =  description;
        this._type = type;
    }

    toWechatAttr(){
        return [
            {
                MsgType:{_cdata:this._type}
            }, 
            {
                Video:[
                    {MediaId:{_cdata:this._mediaId}},
                    {Title:{_cdata:this._title}},
                    {Description:{_cdata:this._description}}
                ]
            }
        ]
    }
}