eval( pm.variables.get( "pm_common" ) );

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