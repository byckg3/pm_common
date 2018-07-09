class TestSelector {
    static selectHttpStatus(context) {
        let statusText = context.statusText.replace(/ /g, "_").toLowerCase();
        return "expect_" + statusText + "_" + context.expectedCode;
    }
}