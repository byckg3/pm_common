class TestClass
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

    selector() 
    {
        throw new Error( 'You have to implement the selector() method' );
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
            do
            {
                let calleeName = this.selector();
            
                if ( ( calleeName in this ) && typeof this[ calleeName ] === "function" )
                {
                    console.log( "Executing : " + calleeName );
                    this[ calleeName ]();
                }
                else
                {
                    console.log( "unexpected result : no matched function" );
                    this.unexpected();
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
            this.tearDown( );
            testResult.output();
        }
       
    }

    unexpected()
    {
        console.log( "unexpected : " ); 
    }

    tearDown()
    {
        console.log( "Tear Down : " ); 
    }
}