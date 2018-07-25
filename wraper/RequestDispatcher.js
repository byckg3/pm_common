class RequestDispatcher {
    static setNextRequest(requestName) {
        postman.setNextRequest(requestName);
    }

    static repeatedRequest( testContext, expectedTimes, nextRequestName ) {
        let initial = 1;
        let requestId = testContext.requestId; // requestId 當作 key, 執行次數為 value
        let times = testContext.getAttribute( requestId ); 

        if ( times === undefined) {
            times = initial;
        }
        else {
            times = parseInt(times, 10) + 1;
        }
        console.log( "Repeated times : " +  times );
        testContext.setEnvironmentAttribute( requestId, times );

        if ( times < expectedTimes ) {
            this.setNextRequest( requestId );
            console.log("Next Request : " + testContext.requestName );
        }
        else {
            testContext.removeAttribute( requestId );
            if ( nextRequestName !== undefined ) {
                this.setNextRequest( nextRequestName );
                console.log("Next Request : " + nextRequestName );
            }
        }
    }

    static getCurrentRepetition( testContext ) {
        let times = testContext.getAttribute( testContext.requestId );
        if (times === undefined) {
            return 0;
        }
        else {
            return parseInt( times, 10 );
        }
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