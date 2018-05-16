Assert = 
{
    assertEqual :
    function( expected, result, message ) 
    {
        if ( expected !== result ) 
        {
            throw new Error( message );
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