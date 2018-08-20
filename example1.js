var TestManager = eval( "(" + pm.variables.get( "TestManager" ) + ")" );
var Utils = TestManager.import( "Utils" );
var RequestDispatcher = TestManager.import( "RequestDispatcher" );
var TestTemplate = TestManager.import( "TestTemplate" );
var Tests = TestManager.getTestAsserter();

class Tester extends TestTemplate {
    expect_ok_200() {
        // branch 200
    }

    expect_bad_request_400() {
        // branch 400
    }
}

new Tester(new TestContext()).run();