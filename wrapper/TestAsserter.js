class TestAsserter
{
    constructor( reporter )
    {
        this._reporter = reporter;
    }

    assertEquals( expected, actual, message = `Expected : ${ expected}, Actual : ${ actual}`, compare = undefined ) 
    {
        let result;
        
        if (typeof compare === "function") {
            result = compare( expected, actual );
        }
        else {
            result = expected === actual;
        }

        if ( !result ) {
            let error = new Error( message );
            error.name = "Assertion Error";

            throw error;
        }
        this.report( message, result );

        return this;
    }

    assertSame( expectedObject, actualObject, message )
    {
        const expected = JSON.stringify( expectedObject );
        const actual = JSON.stringify( actualObject );

        this.assertEquals( expected, actual, message );
    }

    assertContains( superobject, subobject, message ) // superobject contains subobject
    {
        let result = true;

        for ( let eachProperty in subobject ) 
        {   
            let subobjectPropertyValue = JSON.stringify( subobject[ eachProperty ] );
            let superobjectPropertyValue = JSON.stringify( superobject[ eachProperty ] );
            let partOfResult = subobjectPropertyValue === superobjectPropertyValue;

            this.report( 
                `${ eachProperty } : ${ superobjectPropertyValue } should be equal to ${ subobjectPropertyValue }`, partOfResult );
            result = result && partOfResult;
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
        if ( this._reporter )
        {   
            this._reporter.addTestResult( message, result );
        }
        else
        {
            const error = new Error( "TestReporter doesn't exist" );
            error.name = "Initialization Error";

            throw error;
        }
    }
}