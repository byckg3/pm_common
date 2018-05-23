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
    },

    setVariable : 
    function( key, value )
    {
        pm.variables.set( key, value );
    },

    getValueFromJsonString :
    function( jsonString, key )
    {
        let value;
        JSON.parse( jsonString, 
            ( property, data ) => { 
                if ( property === key )
                {
                   value = data;
                }                
                return data;
            } 
        );
        return value;
    },

    getValueObjectFromJsonString :
    function( jsonString, ...keys )
    {
        let vo = {};
        for ( let i = 0; i < keys.length; i++ )
        {
            vo[ keys[ i ] ] = "";
        }
        JSON.parse( jsonString, 
            ( property, data ) => { 
                if ( vo.hasOwnProperty( property ) )
                {
                   vo[ property ] = data;
                }                
                return data;
            } 
        );
        return vo;
    }
}; 