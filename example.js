eval( "(" + pm.variables.get( "Utils" ) + ")" );
eval( Utils.getVariable( "Context" ) );
eval( Utils.getVariable( "TestRunner" ) );
eval( Utils.getVariable( "RequestDispatcher" ) );

function setUp( cxt )
{
    console.log( "Setup :" );
    cxt.expectedCode = 200;
    // common test
    tests[ "Http status code is " + cxt.statusCode ] = cxt.expectedCode === cxt.statusCode;
    tests[ "Response time is " + cxt.responseTime + " ms" ] = cxt.responseTime <= 3000;
}

function tearDown()
{
    console.log( "Tear Down :" );
    RequestDispatcher.setNextRequest( null );
}

function expect_ok_200( cxt )
{
   
}

function expect_bad_request_400( cxt )
{
   
}

function unexpected( cxt )
{
    tests[ "unexpected condition" ] = false;
    throw new Error( cxt );
}

let context = new Context();
let testRunner = new TestRunner();
    
testRunner.run( context );
