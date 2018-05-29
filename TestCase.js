class TestCase
{ 
    constructor()
    {
        this.selecters = [];
    }

    addSelecter( f )
    {
        if ( ( typeof f ) === "function" )
        {
            this.selecters.push( f );
        }
    }

    selecter( context ) 
    {
        let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
        let expectedCode = context.expectedCode;

        return "expect_" + statusText + "_" + expectedCode;
    }

    setUp( cxt )
    {
        console.log( "Setup : " + cxt.requestName );
        
    }

    run( context, testResult = Tests )
    {   
        try
        {
            this.setUp( context );
            do
            {
                let calleeName = this.selecter( context );
            
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

                let first = this.selecters.shift();
                if ( first !== "undefined" )
                {
                    this.selecter = first;
                }

            } while ( this.selecters.length > 0 ) 
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