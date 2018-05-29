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
    function( message, f, ...args )
    {
        if ( ( typeof f ) === "function" )
        {
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

    
}