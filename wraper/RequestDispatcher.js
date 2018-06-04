RequestDispatcher = 
{
    setNextRequest :
    function( requestName )
    {
        postman.setNextRequest( requestName );
    },

    repeatedRequest : 
    function( requestName, expectedTimes, nextRequestName )
    {
        let initial = 1;
        let times = pm.variables.get( requestName ); // requestNmae 當作 key
        
        if ( times === undefined )
        {   
            times = initial;
        }
        else
        {
            times = parseInt( times, 10 ) + 1;
        }
        pm.variables.set( requestName, times );

        if ( times < expectedTimes )
        {
            this.setNextRequest( requestName );
            console.log( "Next Request : " + requestName );
        }
        else
        {   
            if ( nextRequestName !== undefined )
            {
                this.setNextRequest( nextRequestName );
                console.log( "Next Request : " + nextRequestName );
            }
        }    
    },

    getCurrentRepetition :
    function( requestName )
    {
        let times = pm.variables.get( requestName );
        if ( times === undefined )
        {   
            return 0;
        }
        else
        {
            return  parseInt( times, 10 );
        }
    }
}