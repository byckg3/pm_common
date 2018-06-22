class WebApiTestContext // value object
{
    constructor() {
        // default expected value
        this.expectedCode = 200;
        this.expectedTime = 5000;
    }
    // request info
    get requestName() {
        return pm.info.requestName;
    }
    get requestId() {
        return pm.info.requestId;
    }
    get requestUrl() {
        return pm.request.url;
    }
    get requestBodyText() {
        return pm.request.body[pm.request.body.mode];
    }
    // response info
    get statusText() {
        return pm.response.status;
    }
    get statusCode() {
        return pm.response.code;
    }
    get responseTime() {
        return pm.response.responseTime;
    }
    get responseText() {
        return pm.response.text();
    }
    // others
    toString() {

        let expectedValues = "";
        for (let property in this) {
            if (property.includes("expected")) {
                expectedValues += (property + " : " + this[property] + "\t");
            }
        }
        return expectedValues;
    }
}