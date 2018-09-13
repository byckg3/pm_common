eval( pm.variables.get( "pm_common" ) );

class JobDeletionTester extends TestTemplate
{
    setUp()
    {
        RequestDispatcher.repeatedRequest( this.context, 2 );
    }
    
    select_job_status()
    {
        if ( this.context.getAttribute( "jobExists" ) === true )
        {
            return "job_exists";
        }
        else
        {
            return "job_removed";
        }
    }
    // job_exists
    test_job_deletion_successful_if_job_exists()
    {   
        const data = Utils.getValueFromJsonString( this.context.responseText, "data" );
        
        Tests.assertTrue( data, "Job has been removed" );
    }
    after_test_job_deletion_successful_if_job_exists()
    {
        this.context.setAttribute( "jobExists", false );
    }
    // job_removed
    before_check_job_should_not_exist_if_job_removed()
    {
        this.expectedCode = 404;
    }
    check_job_should_not_exist_if_job_removed()
    {
        Tests[ `job doesn't exist` ] = this.context.responseText.includes( "error" );
    }
    after_check_job_should_not_exist_if_job_removed()
    {
        this.context.autoClear = true;  
    }
}

TestManager.executeTests( JobDeletionTester );