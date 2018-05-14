module.exports = class ArticleResource{
    constructor(articles){
        this._type = "news";
        this._articles = articles;
    }

    toWechatAttr(){
        let attr = [
            {
                MsgType: {_cdata: this._type}
            }, 
            {
                ArticleCount: this._articles.length
            }
        ]

        attr.push({
            Articles: this._articles.map(_ => ({
                item: [
                    {
                        Title: {_cdata: _.title}
                    }, 
                    {
                        Description: {_cdata: _.description}
                    }, 
                    {
                        PicUrl: {_cdata: _.picUrl}
                    }, 
                    {
                        Url: {_cdata: _.url}
                    }
                ]
            }))
        })
        return attr;
    }
}