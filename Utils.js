Utils = 
{
    setGlobalVariable :
    function( key, value )
    {
        pm.globals.set( key, value );
    },
    
    getGlobalVariable :
    function( key )
    {
        pm.globals.get( key );
    },

    setEnvironmentVariable :
    function( key, value )
    {
        pm.environment.set( key, value );
    },

    getEnvironmentVariable : 
    function( key )
    {
        pm.environment.get( key );
    },

    getVariable : 
    function( key )
    {
        pm.variables.get( key );
    }
}; 