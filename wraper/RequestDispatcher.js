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
}