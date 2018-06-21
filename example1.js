const Utils = eval( "(" + pm.variables.get( "Utils" ) + ")" );
const RequestDispatcher = eval( "(" + Utils.getVariable( "RequestDispatcher" ) + ")" );
const TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
const Tests = new ( eval( "(" + Utils.getVariable( "Tests" ) + ")" ) )();
const TestContext = eval( "(" + Utils.getVariable( "WebApiTestContext" ) + ")" );
const TestTemplate = eval( "(" + Utils.getVariable( "WebApiTestTemplate" ) + ")" );

class Tester extends TestTemplate
{
    expect_ok_200()
    {   
        // branch 200
    }
    
    expect_bad_request_400()
    {
        // branch 400
    }
}

new Tester( new TestContext() ).run();