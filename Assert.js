Assert = 
{
    results = [],
    
    appendResult :
    function( result, message )
    {
        this.results.push( { "result" : result, "message" : message } );
    },

    // 清除陣列
    clear :
    function()
    {
        this.results = [];
        
    },

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
    },

    
};