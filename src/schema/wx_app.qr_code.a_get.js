const {array, object, string, integer, empty, oneOf, boolean} = require('semantic-schema').schema;

const info = {
    title: "小程序-获取小程序码A接口",
    description: ""
};

const request = object().properties({
    pagePath: string().maxLength(128).desc('已经发布的小程序存在的页面'),
    width: integer().desc('二维码的宽度'),
    autoColor: boolean().desc('自动配置线条颜色'),
    lineColor: {
        r: integer(),
        g: integer(),
        b: integer()
    },
    isHyaline: boolean().desc('是否需要透明底色')
})
    .if.properties({autoColor: true})
    .then.required('pagePath', 'autoColor', 'lineColor')
    .else.required('pagePath')

const response =　string();

module.exports = {info, request, response};