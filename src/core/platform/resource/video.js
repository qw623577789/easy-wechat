module.exports = class VideoResource {
    constructor({mediaId, title = undefined, description = undefined}){
        this._mediaId =  mediaId;
        this._title =  title;
        this._description =  description;
        this._type = "video";
    }

    toWechatAttr(){
        let attr = [
            {
                MsgType:{_cdata:this._type}
            }, 
            {
                MediaId:{_cdata:this._mediaId}
            }
        ]

        if (this._title != undefined) {
            attr.push(
                {Title: {_cdata: this._title}}
            )
        }

        if (this._description != undefined) {
            attr.push(
                {Description:{_cdata:this._description}}
            )
        }

        return attr;
    }
}