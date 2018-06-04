RequestDispatcher = 
{
    setNextRequest :
    function( requestName )
    {
        postman.setNextRequest( requestName );
    },

    repeatedRequest : 
    function( requestName, expectedTimes )
    {
        let times = pm.variables.get( requestName ); // requestNmae 當作 key
        console.log( "times " + (typeof times) );
        if ( times === undefined )
        {
            pm.variables.set( requestName, expectedTimes );
            times = expectedTimes;
        }
        else
        {
            times = parseInt( times, 10 ) - 1;
            pm.variables.set( requestName, times );
        }
        
        if ( times > 0 )
        {
            this.setNextRequest( requestName );
        }    
    }
}