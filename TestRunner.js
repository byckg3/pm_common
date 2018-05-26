function TestRunner() 
{ 
    this.addSelecter = 
    function( f )
    {
        if ( ( typeof f ) === "function" )
        {
            this.selecter = f;
        }
    };

    this.selecter = 
    function( context )
    {
        let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
        let expectedCode = context.expectedCode;

        return "expect_" + statusText + "_" + expectedCode;
    };

    this.setUp = 
    function( context )
    {
        console.log( "Setup : " + context.requestName );
    };

    this.run =
    function( context )
    {   
        try
        {
            this.tryToCall( "setUp", context );
        
            let calleeName = this.selecter( context );

            if ( this.tryToCall( calleeName, context) )
            {
                console.log( "Executing : " + calleeName );
            }
            else
            {
                console.log( "unexpected result : no matched function" );
                this.tryToCall( "unexpected", context );
            }
        }
        catch( error )
        {
            console.log( error.name );
            console.log( error.message );
        }
        finally
        {
            this.tryToCall( "tearDown", context );
        }
       
    };

    this.unexpected = 
    function( context )
    {
        throw new Error( context );
    };

    this.tearDown = 
    function( context )
    {
        console.log( "Tear Down : " + context.requestName );
    };

    this.tryToCall = 
    function( fName, ...args )
    {
        if ( eval( "typeof " + fName ) === "function" )
        {
            eval( fName + "( ...args )" );
            return true;
        } 
        else if ( this.hasOwnProperty( fName ) && ( typeof this[ fName ] === "function" ) )
        {
            this[ fName ]( ...args );
            return true;
        }
        
        return false;   
    };
}