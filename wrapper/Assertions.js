class Assertions
{
    static assertEquals( expected, actual, message, compare) 
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

    static assertSame( expectedObject, actualObject, message )
    {
        const expected = JSON.stringify( expectedObject );
        const actual = JSON.stringify( actualObject );

        this.assertEquals( expected, actual, message );
    }

    static assertContains( actualObject, expectedObject, message ) // actualObject contains expectedObject
    {
        let result = true;

        for ( let eachProperty in expectedObject ) {
            let partOfResult = JSON.stringify( expectedObject[ eachProperty ] ) === JSON.stringify( actualObject[ eachProperty ] );
            result = result && partOfResult;

            this.addTestResult( `Test ${ eachProperty }`, partOfResult );
        }

        this.assertTrue( result, message );
    }

    static assertFalse( result, message ) 
    {
        this.assertEquals( false, result, message );
    }

    static assertTrue( result, message ) 
    {
        this.assertEquals( true, result, message );
    }

    static fail( message )
    {
        this.assertEquals( true, false, message );
    }

    static report( message, result )
    {
        if ( TestManager )
        {   
            TestManager.getTestReporter().addTestResult( message, result );
        }
        else
        {
            let error = new Error( "TestManager doesn't exist" );
            error.name = "Initialization Error";

            throw error;
        }
    }
}