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
        return pm.globals.get( key );
    },

    setEnvironmentVariable :
    function( key, value )
    {
        pm.environment.set( key, value );
    },

    getEnvironmentVariable : 
    function( key )
    {
        return pm.environment.get( key );
    },

    getVariable : 
    function( key )
    {
        return pm.variables.get( key );
    }
}; 