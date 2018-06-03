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

    setUp( cxt )
    {
        console.log( "Runner Setup : " );
    }

    run( context, testResult = Tests )
    {   
        try
        {
            this.setUp( context );

            for ( let i = 0, len = this.testCases.length; i < len; i++ )
            {
                this.testCases[ i ].run();
            }
           
        }
        catch( error )
        {
            console.log( error.name );
            console.log( error.message );
        }
        finally
        {
            this.tearDown( context );
            testResult.output();
        }
       
    }

    tearDown( cxt )
    {
        console.log( "Runner Tear Down : " );
    }
}