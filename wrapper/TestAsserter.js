class TestAsserter
{
    constructor( reporter )
    {
        this.testReporter = reporter;
    }
    assertEquals( expected, actual, message, compare) 
    {
        let result;
        
        if (typeof compare === "function") {
            result = compare(expected, actual);
        }
        else {
            result = expected === actual;
        }

        this.report( message, result );

        if ( !result ) {
            let error = new Error( message );
            error.name = "Assertion Error";

            throw error;
        }

        return this;
    }

    assertSame( expectedObject, actualObject, message )
    {
        const expected = JSON.stringify( expectedObject );
        const actual = JSON.stringify( actualObject );

        this.assertEquals( expected, actual, message );
    }

    assertContains( actualObject, expectedObject, message ) // actualObject contains expectedObject
    {
        let result = true;

        for ( let eachProperty in expectedObject ) {
            let partOfResult = JSON.stringify( expectedObject[ eachProperty ] ) === JSON.stringify( actualObject[ eachProperty ] );
            result = result && partOfResult;

            this.addTestResult( `Test ${ eachProperty }`, partOfResult );
        }

        this.assertTrue( result, message );
    }

    assertFalse( result, message ) 
    {
        this.assertEquals( false, result, message );
    }

    assertTrue( result, message ) 
    {
        this.assertEquals( true, result, message );
    }

    fail( message )
    {
        this.assertEquals( true, false, message );
    }

    report( message, result )
    {
        if ( this.testReporter )
        {   
            this.testReporter.addTestResult( message, result );
        }
        else
        {
            let error = new Error( "TestReporter doesn't exist" );
            error.name = "Initialization Error";

            throw error;
        }
    }
}