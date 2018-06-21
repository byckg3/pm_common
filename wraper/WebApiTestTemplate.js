class WebApiTestTemplate
{ 
    constructor( context )
    {
        this.context = context;
        this.schedule( [ "common_test" ] );
        this.addSelector( 
            ( context ) => {
                let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
               
                return "expect_" + statusText + "_" + context.expectedCode;
            } 
        );
        this.step = 0;
    }

    clearSelectors() 
    {
        this.selectors = [];
    }

    addSelector( selector )
    {
        if ( typeof selector === "function" )
        {
            this.selectors.push( selector );
        }
        else if ( typeof selector === "string" )
        {
            this.addSelector( () => selector );
        }
    }

    schedule( selectors ) // reset selectors
    {
        this.clearSelectors();

        for ( let selector of selectors )
        {
            this.addSelector( selector );
        }
    }

    setUp()
    {
        console.log( "setup : " + this.context.requestName );
    }

    common_test()
    {
        let cxt = this.context;
        Tests[ "Http status code : " + cxt.statusCode ] = cxt.expectedCode === cxt.statusCode;
        Tests[ "Response time : " + cxt.responseTime + " ms" ] = cxt.responseTime <= cxt.expectedTime;
    }

    run( testResult = Tests )
    {   
        try
        {
            this.setUp();

            while ( this.step < this.selectors.length )
            {
                let calleeName = this.selectors[ this.step ]( this.context );
            
                if ( ( calleeName in this ) && typeof this[ calleeName ] === "function" )
                {
                    console.log( this.step + ". Executing : " + calleeName );
                    this[ calleeName ]();
                }
                else
                {
                    console.log( "unexpected result : no matched function" );
                    this.unexpected();
                }

                this.step++;       
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

    unexpected()
    {
        throw new Error( this.context );
    }

    tearDown()
    {
        console.log( "tear down : " + this.context.requestName );
    }
}