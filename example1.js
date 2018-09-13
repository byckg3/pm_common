eval( pm.variables.get( "pm_common" ) );

class JobInfoTester extends TestTemplate
{
    setUp()
    {
        this.jobInfo = Utils.getValueObjectFromJsonString( this.context.responseText, "jobNo", "switch" );
        this.selector.selectHttpStatus( 200 );
    }
    
    check_job_number_if_http_status_200()
    {   
        let number = parseInt( Utils.getEnvironmentVariable( "jobNo" ), 10 );
        let toggle = this.context.getAttribute( "switch" );
        
        Tests[ "Job number : " + number ] = number === this.jobInfo.jobNo;
        Tests[ "Job's switch : " + toggle ] = toggle === this.jobInfo.switch;
    }
    
    check_job_info_if_http_status_200()
    {
        const returnedJobInfo = this.context.responseJson.data;
        const expectedJobInfo = this.context.getAttribute( "expectedJobInfo" );
      
        Tests.assertContains( returnedJobInfo, expectedJobInfo, "job info should be consistent" );
    }                         
}
TestManager.executeTests( JobInfoTester );