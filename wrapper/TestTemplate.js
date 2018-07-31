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

	run() {
		try {
			this.setUp();
            
			while ( this.selector.hasNext() ) 
			{   
				let calleeName = this.selector.next(  this );

                if ( this.isCallableFunction( calleeName ) ) 
                {
                    console.log( "Executing : " + calleeName);
                    this[ calleeName ]();
                }
                else {
                    console.log( "unexpected condition : no matched method");
                    this.unexpected();
                }
            }
        }
        catch (error) {
            const errMsg = `${ error.name } : ${ error.message }`;
            console.log(errMsg);       
            this.testReporter.fail( errMsg );
        }
        finally {
            this.tearDown();
            if ( this.testReporter )
            {   
                this.testReporter.results();
            }   
        }
    }

	tearDown() {
		console.log( "tear down : " + this.context.requestName );
		if ( this.context.autoClear )
		{
			this.context.clearAttributes();
		}
	}

	isCallableFunction( calleeName )
	{
		return ( calleeName in this ) && ( typeof this[ calleeName ] === "function" );
	}
}