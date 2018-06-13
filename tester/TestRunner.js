class TestRunner
{ 
    constructor()
    {
        this.testCases = [];
    }

    addTestCase( t )
    {
        if ( t instanceof TestCase )
        {
            this.testCases.push( t );
        }
    }

    setUp()
    {
        console.log( "Setup : " );
    }

    run( testResult )
    {   
        try
        {
            this.setUp();

            for ( let i = 0, len = this.testCases.length; i < len; i++ )
            {
                this.testCases[ i ].run( testResult );
            }
           
        }
        catch( error )
        {
            console.log( error.name );
            console.log( error.message );
        }
        finally
        {
            this.tearDown();
            testResult.output();
        }
       
    }

    tearDown()
    {
        console.log( "Tear Down : " );
    }
}