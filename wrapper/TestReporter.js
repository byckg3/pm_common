class TestReporter {
    constructor() {
        this._results = new Map();
    }

    // 以 message 回傳指定 test result
    getTestResult( message ) {
        let result = this._results.get(message);

        if (typeof result === "undefined") {
            result = this[message];
        }

        return result;
    }

    addTestResult( message, result )
    {   
        this._results.set( message, result );

        return this;
    }

    results() {
        if ( this._results.size > 0) {
            for ( let [msg, value] of this._results.entries()) {
                tests[ msg ] = value; // pm syntax
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