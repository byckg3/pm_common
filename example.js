eval( "(" + pm.variables.get( "Utils" ) + ")" );
eval( Utils.getVariable( "RequestDispatcher" ) );
eval( Utils.getVariable( "Context" ) );
eval( Utils.getVariable( "Tests" ) );
const TestCase = eval( "(" + Utils.getVariable( "TestCase" )+")" );

class Tester extends TestCase
{
    setUp( cxt )
    {
        super.setUp( cxt );
        cxt.expectedCode = 200;
        cxt.expectedTime = 5000;
        // common test
        Tests[ "Http status code : " + cxt.statusCode ] = cxt.expectedCode === cxt.statusCode;
        Tests[ "Response time : " + cxt.responseTime + " ms" ] = cxt.responseTime <= cxt.expectedTime;
    }
    
    expect_ok_200( cxt )
    {   
        // branch 200 
    }
    
    expect_bad_request_400( cxt )
    {
        //  branch 400
    }
    unexpected( cxt )
    {
        Tests[ cxt.toString() ] = false;
    }

}

let tester = new Tester();
tester.run( new Context() );