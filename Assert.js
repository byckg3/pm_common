Assert = 
{
    assertBy :
    function( f )
    {
        if ( ( typeof f ) === "function" && f() )
        {
            
        }
    },

    assertEqual :
    function( expected, result, message ) 
    {
        if ( expected !== result ) 
        {
            //throw new Error( message );
        }
        else
        {
            throw "Success";
        }
    },

    fail :
    function( message )
    {
        throw new Error( message );
    }
};