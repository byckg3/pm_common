class RequestDispatcher {
    static setNextRequest(requestName) {
        postman.setNextRequest(requestName);
    }

    static repeatedRequest( testContext, expectedTimes, nextRequestName = null ) 
    {
        let initial = 1;
        let currentTimes = 0;
        const requestId = testContext.requestId; // requestId 當作 key, 執行次數為 value
    
        if ( Utils.hasVariable( requestId ) )
        {
            currentTimes = parseInt( Utils.getVariable( requestId ), 10 ) + 1; 
        }
        else 
        {
            currentTimes = initial;
        }
        console.log( "Repeated times : " +  currentTimes );
        Utils.setVariable( requestId, currentTimes );
        
        if ( currentTimes < expectedTimes ) {
            this.setNextRequest( requestId );
            console.log( "Next Request : " + testContext.requestName );
        }
        else {
            testContext.removeAttribute( requestId );
            this.setNextRequest( nextRequestName );
            if ( nextRequestName ) {
                console.log( "Next Request : " + nextRequestName );
            }
        }
    }

    static getCurrentRepetition( testContext ) {
        let currentTimes = 0;
        if ( Utils.hasVariable( testContext.requestId ) )
        {
            currentTimes = parseInt( Utils.getVariable( testContext.requestId ), 10 ); 
        }
        return currentTimes;
    }

    static setTestCaseRequest(test_case_object) {
        // 存在才會 setNextRequest
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