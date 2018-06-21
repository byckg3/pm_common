class WebApiTestTemplate
{ 
    constructor( context )
    {
        this.context = context;
        this.schedule( [ "common_tests" ] );
        this.addSelector( TestSelector.selectHttpStatus );
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

    common_tests()
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
                    console.log( this.step + ". unexpected condition : no matched function" );
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
        Tests[ "unexpected condition. " + this.context ] = false;
    }

    tearDown()
    {
        console.log( "tear down : " + this.context.requestName );
    }
}