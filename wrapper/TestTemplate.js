class TestTemplate 
{
    constructor( manager ) 
    {
        this.context = manager.getTestContext();
        this.selector = manager.getTestSelector();
        this.reporter = manager.getTestReporter();
        // default expected value
        this.expectedCode = 200;
		this.expectedResponseTime = 3000;
    }

	setUp() 
	{
		
	}

	test_http_status_code( statusCode = this.expectedCode )
	{
		const cxt = this.context;
		this.expectedCode = statusCode;
		this.reporter.addTestResult( `Http status code : ${ this.expectedCode }`, cxt.statusCode === this.expectedCode );
	}

	test_response_time( responseTime = this.expectedResponseTime )
	{
		const cxt = this.context;
		this.expectedResponseTime = responseTime;
		this.reporter.addTestResult( `Response time : ${ cxt.responseTime } ms <= ${ this.expectedResponseTime } ms`, cxt.responseTime <= this.expectedResponseTime );
	}

	unexpected()
	{
		this.reporter.addTestResult( "unexpected condition : no matched method", false );
	}

	tearDown() {
		if ( this.context.autoClear )
		{
			this.context.clearAttributes();
		}
	}
}