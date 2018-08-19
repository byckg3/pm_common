class TestTemplate 
{
    constructor( context, selector, reporter ) 
    {
        this.context = context;
        this.selector = selector;
        this.reporter = reporter;
        // default expected value
        this.expectedCode = 200;
        this.expectedResponseTime = 3000;
    }

	setUp() 
	{
		
	}

	test_http_status_code()
	{
		const cxt = this.context;
		this.reporter.addTestResult( `Http status code : ${ cxt.statusCode }`, cxt.statusCode === this.expectedCode );
	}

	test_response_time()
	{
		const cxt = this.context;
		this.reporter.addTestResult( `Response time : ${ cxt.responseTime } ms`, cxt.responseTime <= this.expectedResponseTime );
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