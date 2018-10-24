class RequestDispatcher 
{
    static get DATA_KEY()
    {
        return "Scheduler";
    }

    static get scheduler()
    {
        this._scheduler = [];
        if ( Utils.hasVariable( this.DATA_KEY ) )
        {
            this._scheduler = Utils.getVariable( this.DATA_KEY );
        }
        return this._scheduler;
    }

    static set scheduler( settingObj )
    {
        Utils.setVariable( this.DATA_KEY, settingObj );
    }

    static setNextRequest( nextRequestName ) 
    {
        postman.setNextRequest( nextRequestName );
        console.log( "Next Request : " + nextRequestName );
    }

    static terminate()
    {
        this.setNextRequest( null );
    }

    static schedule( ...orders )
    {
        this.scheduler = this.scheduler.concat( ...orders );
        console.log( this.scheduler );
    }

    static dispatchNext( context )
    {
        const currentRequestName = context.requestName;
        let currentOrder = this.scheduler.indexOf( currentRequestName );

        if ( currentOrder >= 0 && currentOrder < this.scheduler.length - 1 )
        {
            let nextRequest = this.scheduler[ currentOrder + 1 ];
            this.setNextRequest( nextRequest );
        }
    }
    
    static repeatedRequest( context, expectedTimes, nextRequestName ) 
    {
        const requestId = context.requestId; // requestId 當作 key, 執行次數為 value
        let currentRepeatedTimes = this.getRepetition( context ) + 1;

        console.log( "Repeated times : " +  currentRepeatedTimes );
        this._setRepetition( context, currentRepeatedTimes );
        
        if ( currentRepeatedTimes < expectedTimes ) {
            this.setNextRequest( context.requestName );
        }
        else {
            context.removeAttribute( requestId );
            if ( nextRequestName !== undefined ) {
                this.setNextRequest( nextRequestName );
            }
            else
            {
                this.dispatchNext( context );
            }
        }
    }

    static getRepetition( context ) {
        let repeatedTimes = 0;
        if ( Utils.hasVariable( context.requestId ) )
        {
            repeatedTimes = parseInt( Utils.getVariable( context.requestId ), 10 ); 
        }
        return repeatedTimes;
    }

    static _setRepetition( context, times )
    {
        Utils.setVariable( context.requestId, times );
    }

    static setTestCaseRequest(test_case_object) {
        // 存在才會 setNextRequest
        // 判斷順序 Setup > Test > Teardown > NextTest
        console.log(test_case_object)
        let NextReq = null;
        if (test_case_object.Setup.length > 0) {
            NextReq = test_case_object.Setup.shift();
        } else if (test_case_object.Test.length > 0) {
            NextReq = test_case_object.Test.shift();
        } else if (test_case_object.Teardown.length > 0) {
            NextReq = test_case_object.Teardown.shift();
        } else {
            NextReq = test_case_object.NextTest;
        }
        console.log("Next Request : " + NextReq);
        this.setNextRequest(NextReq);
        return test_case_object
    }
}