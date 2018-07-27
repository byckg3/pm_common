class TestCollector {
    constructor() {
        this.results = new Map();
        this.passedResults = 0; // counter
        this.failedResults = 0; // counter
    }

    get total()
    {
        return this.passedResults + this.failedResults;
    }

    get passRate()
    {
        return this.passedResults / this.total;
    }

    increaseResult( booleanExpression )
    {
        if ( booleanExpression )
        {
            this.passedResults++;
        }
        else
        {
            this.failedResults++;
        }
    }
    // 以 message 回傳指定 test result
    getTestResult( message ) {
        let result = this.results.get(message);

        if (typeof result === "undefined") {
            result = this[message];
        }

        return result;
    }

    addTestResult( message, result )
    {
        this.results.set( message, result );

        return this;
    }

    assertEquals( message, expected, actual, compare) {
        let result;
        
        if (typeof compare === "function") {
            result = compare(expected, actual);
        }
        else {
            result = expected === actual;
        }

        this.results.set( message, result );
        increaseResult( result );

        if ( !result ) {
            let error = new Error( message );
            error.name = "AssertionError";
            throw error;
        }

        return this;
    }

    assertSame( message, expectedObject, actualObject )
    {
        let expected = JSON.stringify( expectedObject );
        let actual = JSON.stringify( actualObject );

        this.assertEquals( message, expected, actual );
    }

    assertContains( message, actualObject, expectedObject ) // actualObject contains expectedObject
    {
        let result = true;

        for ( let eachProperty in expectedObject ) {
            let partOfResult = JSON.stringify( expectedObject[ eachProperty ]) === JSON.stringify( actualObject[ eachProperty ] );
            result = result && partOfResult;

            this.addTestResult( `Test ${ eachProperty }`, partOfResult );
        }
        this.assertTrue( message, result );
    }

    assertFalse( message, booleanExpression ) {
        this.assertEquals( message, false, booleanExpression );
    }

    assertTrue( message, booleanExpression) {
        this.assertEquals( message, true, booleanExpression );
    }

    fail( message = "test fails" )
    {
        this.assertEquals( message, true, false );
    }

    results() {
        if ( this.results.size > 0) {
            for ( let [msg, value] of this.results.entries()) {
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