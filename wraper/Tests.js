class Tests {
    constructor() {
        this.results = new Map();
        this.pass = 0; // counter
        this.fail = 0; // counter
    }
    // 以 message 回傳指定的 test result
    getTestResult(message) {
        let result = results.get(message);

        if (typeof result === "undefined") {
            result = this[message];
        }

        return result;
    }

    assertEquals( message, expected, actual, compare) {
        let result;
        
        if (typeof compare === "function") {
            result = compare(expected, actual);
        }
        else {
            result = expected === actual;
        }

        this.results.set(message, result);

        return this;
    }

    assertFalse( message, booleanExpression) {
        this.assertEquals( message, false, booleanExpression);
    }

    assertTrue( message, booleanExpression) {
        this.assertEquals(true, booleanExpression, message);
    }

    fail(message = "test fail") {
        this.results.set(message, false);
    }

    pass(message = "test pass") {
        this.results.set(message, true);
    }

    output() {
        if (this.results.size > 0) {
            for (let [msg, value] of this.results.entries()) {
                tests[msg] = value; // pm syntax
            }
        }
        for (let pName of Object.keys(this)) // Object.keys() => array
        {
            if (typeof this[pName] === "boolean") {
                tests[pName] = this[pName]; // pm syntax
            }
        }
    }
}