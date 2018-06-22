eval( pm.variables.get( "pm_common" ) );

class Tester extends TestTemplate
{
    expect_ok_200()
    {   
        let jobInfo = Utils.getValueObjectFromJsonString( this.context.responseText, "jobNo", "switch" );
    
        if ( typeof jobInfo.jobNo === "number" )
        {
            Tests[ "Job number : " +  jobInfo.jobNo ] = true;
            
            Utils.setEnvironmentVariable( "jobNo", jobInfo.jobNo );
            Utils.setEnvironmentVariable( "switch", jobInfo.switch );
        }
    }
    
}

new Tester( new TestContext() ).run();