class TestTemplate 
{
    constructor( context, selector, reporter ) 
    {
        this.context = context;
        this.selector = selector;
        this.reporter = reporter;
        // default expected value
        this.expectedCode = 200;
        this.expectedResponseTime = 5000;
    }

	setUp() { }

    common_tests() 
    {
		const cxt = this.context;
		this.reporter.addTestResult( `Http status code : ${ cxt.statusCode }`, cxt.statusCode === this.expectedCode )
                     .addTestResult( `Response time : ${ cxt.responseTime } ms`, cxt.responseTime <= this.expectedResponseTime );               
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