class TestRunner // tests runner
{
    constructor() {
        this.testCases = [];
    }

    addTestCase(t) {
        if (t.run) {
            this.testCases.push(t);
        }
    }

    setUp() {
        console.log("Setup : ");
    }

    run(testResult) {
        try {
            this.setUp();

            for (let i = 0, length = this.testCases.length; i < length; i++) {
                this.testCases[i].run(testResult);
            }

        }
        catch (error) {
            console.log(error.name);
            console.log(error.message);
        }
        finally {
            this.tearDown();
            testResult.output();
        }
    }

    tearDown() {
        console.log("Tear Down : ");
    }
}