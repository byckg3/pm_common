class TestTemplate
{ 
    constructor()
    {
        this.selectors = [];
        this.addSelector( 
            ( context ) => {
                let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
               
                return "expect_" + statusText + "_" + context.expectedCode;
            } 
        );
    }

    addSelector( f )
    {
        if ( ( typeof f ) === "function" )
        {
            this.selectors.push( f );
        }
    }

    selector( context ) // current selector
    {
        return "commonTest";
    }

    setUp( cxt )
    {
        console.log( "setup : " + cxt.requestName );
        
    }

    commonTest( cxt )
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

                this.selector = this.selectors.shift();
               
            } while ( this.selector ) 
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
        console.log( "tear down : " + cxt.requestName );
    }
}