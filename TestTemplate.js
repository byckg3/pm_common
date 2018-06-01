class TestTemplate
{ 
    constructor()
    {
        this.selectors = [];
    }

    addSelector( f )
    {
        if ( ( typeof f ) === "function" )
        {
            this.selectors.push( f );
        }
    }

    selector( context )
    {
        let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
        let expectedCode = context.expectedCode;

        return "expect_" + statusText + "_" + expectedCode;
    }

    setUp( cxt )
    {
        console.log( "Setup : " + cxt.requestName );
    }

    common_test( cxt )
    {
        Tests[ "Http status code : " + cxt.statusCode ] = cxt.expectedCode === cxt.statusCode;
        Tests[ "Response time : " + cxt.responseTime + " ms" ] = cxt.responseTime <= cxt.expectedTime;
    }

    run( context, testResult = Tests )
    {   
        try
        {
            this.setUp( context );
            do
            {
                let calleeName = this.selector( context );
            
                if ( ( calleeName in this ) && typeof this[ calleeName ] === "function" )
                {
                    console.log( "Executing : " + calleeName );
                    this[ calleeName ]( context );
                }
                else
                {
                    console.log( "unexpected result : no matched function" );
                    this.unexpected( context );
                }

                let first = this.selectors.shift();
                if ( first !== "undefined" )
                {
                    this.selector = first;
                }

            } while ( this.selectors.length > 0 ) 
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

    unexpected( cxt )
    {
        throw new Error( cxt );
    }

    tearDown( cxt )
    {
        console.log( "Tear Down : " + cxt.requestName );
    }
}