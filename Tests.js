<<<<<<< HEAD
function Tests() 
{
    this.results = new Map();
    
    this.appendResult =
    function( message, result )
    {
        this.results.set(  "message", result );
    };

    // 清除陣列
    this.clear =
    function()
    {
        this.results = [];
        
    };

    this.assertBy =
=======
Tests = 
{
    results : new Map(),

    clear :
    function()
    {
        this.results.clear();
        
    },

    assertBy :
>>>>>>> ea7cf47b2afb2b44a41299ff8536d071b8fae782
    function( message, f, ...args )
    {
        if ( ( typeof f ) === "function" )
        {
<<<<<<< HEAD
            tests[ message ] = f( ...args );
        }
    };

    this.assertEquals =
    function( message, expected, result ) 
    {
        tests[ message ] = expected === result;
    };

    this.fail =
    function( message )
    {
        tests[ message ] = false;
        
    };

    
=======
            this.results.set( message, f( ...args ) );
        }
    },

    assertEquals :
    function( message, expected, result ) 
    {
        this.results.set( message, expected === result );
    },

    assertJsonEquals :
    function( message, jsonA, jsonB )
    {
        let a = JSON.stringify( jsonA );
        let b = JSON.stringify( jsonB );
        this.results.set( message, a === b );
    },

    fail :
    function( message = "test fail" )
    {
        this.results.set( message, false );
    },

    pass : 
    function( message )
    {
        this.results.set( message, true );
    },

    output:
    function()
    {
        if ( this.results.size > 0 )
        {
            for ( let [ msg, value ] of this.results.entries() ) 
            {
                tests[ msg ] = value; // pm syntax
            }
        }
        for ( let pName of Object.keys( this ) ) // Object.keys() => array
        {
            if ( typeof this[ pName ] === "boolean" )
            {
                tests[ pName ] = this[ pName ]; // pm syntax
            }
        }
    }    
>>>>>>> ea7cf47b2afb2b44a41299ff8536d071b8fae782
}