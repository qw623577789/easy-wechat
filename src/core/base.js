const assert = require('assert');

module.exports  = class Base {
    constructor (logger, config = undefined) {
        this.logger = logger;
        this.config = config;
    }

    get request() {
        let skipRequest = require('skip-request');
        let getRequest = skipRequest.get;
        let postRequest = skipRequest.post;

        getRequest.execute = async () => {
            let response = await getRequest.submit();
            this.logger.package(JSON.stringify(response.httpInfo));
            return response;
        };

        postRequest.execute = async () => {
            let response = await postRequest.submit();
            this.logger.package(JSON.stringify(response.httpInfo));
            return response;
        };

        return {
            get: getRequest,
            post: postRequest
        }
    }

    commonResponseJsonParse(response) {
        assert(response.status == 200, "error response status");
        let jsonBody = response.toJson();
        assert(typeof jsonBody.errcode === "undefined" ||  jsonBody.errcode == 0, jsonBody.errmsg);
        return jsonBody;
    }

    paymentResponseJsonParse(response) {
        assert(response.status == 200, "error response status");
        let jsonBody = response.toJson();
        assert(jsonBody.xml.return_code === "SUCCESS", jsonBody.xml.return_msg);
        return jsonBody;
    }

    rmUndef(value) {
        return Object.entries(value)
            .reduce((prev, [key, value]) => {
                if (value !== undefined) prev[key] = value;
                return prev;
            }, {});
    }
}