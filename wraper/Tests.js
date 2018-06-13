Tests = 
{
    results : new Map(),

    clear()
    {
        this.results.clear();
        
    },

    assertBy( message, f, ...args )
    {
        if ( ( typeof f ) === "function" )
        {
            this.results.set( message, f( ...args ) );
        }
    },

    assertEquals( message, expected, result ) 
    {
        this.results.set( message, expected === result );
    },

    assertJsonEquals( message, jsonA, jsonB )
    {
        let a = JSON.stringify( jsonA );
        let b = JSON.stringify( jsonB );
        this.results.set( message, a === b );
    },

    fail( message = "test fail" )
    {
        this.results.set( message, false );
    },

    pass( message )
    {
        this.results.set( message, true );
    },

    output()
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
}