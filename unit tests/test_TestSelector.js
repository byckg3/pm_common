class Tester extends TestTemplate
{
    setUp()
    {
        this.selector.schedule( [ "common_tests" ] );
    }
    common_tests()
    {
        this.test__fetchCondition();
    }

    test__fetchCondition()
    {
        let functionName0 = "test_data";
        let functionName1 = "test_ok_data_if_status_200";
        let functionName2 = "test_bad_request_data_if_status_400";
        let functionName3 = "test_not_found_data_if_status_404";
        let functionName4 = "test_data_if_conditionA";
        let functionName5 = "test_data_if_conditionB";
        
        console.log( this.selector._fetchCondition( functionName4 ) );
        Tests.assertEquals( this.selector._fetchCondition( functionName0 ), "", "assert :  no condition" );
        Tests.assertEquals( this.selector._fetchCondition( functionName1 ), "status_200", "assert condition : status_200" );
        Tests.assertEquals( this.selector._fetchCondition( functionName2 ), "status_400", "assert condition : status_400" );
        Tests.assertEquals( this.selector._fetchCondition( functionName3 ), "status_404", "assert condition : status_404" );
        Tests.assertEquals( this.selector._fetchCondition( functionName4 ), "conditionA", "assert condition : conditionA" );
        Tests.assertEquals( this.selector._fetchCondition( functionName5 ), "conditionB", "assert condition : conditionB" );
    }
}
TestManager.executeTests( Tester );