class TestTemplate 
{
    constructor( context, selector, reporter ) 
    {
        this.context = context;
        this.selector = selector;
        this.testReporter = reporter;
        // default expected value
        this.expectedCode = 200;
        this.expectedResponseTime = 5000;
    }

	setUp() {
		console.log("setup : " + this.context.requestName);
	}

    common_tests() 
    {
		const cxt = this.context;
		this.testReporter.addTestResult( `Http status code : ${ cxt.statusCode }`, cxt.statusCode === this.expectedCode )
                         .addTestResult( `Response time : ${ cxt.responseTime } ms`, cxt.responseTime <= this.expectedResponseTime );               
	}

	tearDown() {
		console.log( "tear down : " + this.context.requestName );
		if ( this.context.autoClear )
		{
			this.context.clearAttributes();
		}
	}
}