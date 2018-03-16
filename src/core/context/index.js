const Base = require('../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
        let Platform = require('./platform');
        let WxApp = require('./wx_app');
        this._platform = new Platform(this.logger, this.config);
        this._wxapp = new WxApp(this.logger, this.config);
    }

    get platform() {
        return this._platform;
    }

    get wxApp() {
        return this._wxapp;
    }
}