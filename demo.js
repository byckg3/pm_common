var TestManager = eval( "(" + pm.variables.get( "TestManager" ) + ")" );
var Utils = TestManager.import( "Utils" );
var RequestDispatcher = TestManager.import( "RequestDispatcher" );
var TestTemplate = TestManager.import( "TestTemplate" );
var Tests = TestManager.getTestAsserter();

class Tester extends TestTemplate 
{
    

}

TestManager.executeTests( Tester );