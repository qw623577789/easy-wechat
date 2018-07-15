const {array, object, string, integer, empty, oneOf, boolean} = require('semantic-schema').schema;

const info = {
    title: "小程序-获取小程序码B接口",
    description: ""
};

const request = object().properties({
    scene: string().pattern(/[A-Za-z0-9\!\#\$\&\'\(\)\*\+\,\/\:\;\=\?\@\-\.\_\~]{0, 32}/).desc('场景'),
    pagePath: string().desc('已经发布的小程序存在的页面'),
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
    .then.required('scene', 'pagePath', 'autoColor', 'lineColor')
    .else.required('scene', 'pagePath')

const response = string()

module.exports = {info, request, response};