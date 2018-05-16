Assert = 
{
    assertBy :
    function( message, f, ...args )
    {
        if ( ( typeof f ) === "function" )
        {
            tests[ message ] = f( ...args );
        }
    },

    assertEquals :
    function( message, expected, result ) 
    {
        tests[ message ] = expected === result;
        // if ( expected !== result ) 
        // {
        //     throw new Error( message );
        // }
        // else
        // {
        //     throw "Success";
        // }
    },

    fail :
    function( message )
    {
        tests[ message ] = false;
        //throw new Error( message );
    }
};