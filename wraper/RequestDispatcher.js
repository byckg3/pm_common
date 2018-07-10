class RequestDispatcher {
    static setNextRequest(requestName) {
        postman.setNextRequest(requestName);
    }

    static repeatedRequest(requestNameOrId, expectedTimes, nextRequestNameOrId) {
        let initial = 1;
        let times = pm.environment.get(requestNameOrId); // requestNmae or requestId 當作 key

        if (times === undefined) {
            times = initial;
        }
        else {
            times = parseInt(times, 10) + 1;
        }
        console.log( "Repeated times : " +  times );
        pm.environment.set(requestNameOrId, times);

        if (times < expectedTimes) {
            this.setNextRequest(requestNameOrId);
            console.log("Next Request : " + requestNameOrId);
        }
        else {
            pm.environment.unset(requestNameOrId);
            if (nextRequestNameOrId !== undefined) {
                this.setNextRequest(nextRequestNameOrId);
                console.log("Next Request : " + nextRequestNameOrId);
            }
        }
    }

    static getCurrentRepetition(requestName) {
        let times = pm.variables.get(requestName);
        if (times === undefined) {
            return 0;
        }
        else {
            return parseInt(times, 10);
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