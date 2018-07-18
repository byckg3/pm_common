class WebApiTestTemplate 
{
    constructor(context) 
    {
        this.context = context;
        this.testSelector = new TestSelector( this ); 
    }

    setUp() {
        console.log("setup : " + this.context.requestName);
    }

    common_tests() {
        let cxt = this.context;
        Tests[ `Http status code : ${ cxt.statusCode }` ] = cxt.expectedCode === cxt.statusCode;
        Tests[ `Response time : ${ cxt.responseTime } ms` ] = cxt.responseTime <= cxt.expectedTime;
    }

    run(testResult = Tests) {
        try {
            this.setUp();
            
            while ( this.testSelector.hasNext() ) 
            {   
                let calleeName = this.testSelector.next();

                if ( (calleeName in this) && typeof this[ calleeName ] === "function") {
                    console.log( "Executing : " + calleeName);
                    this[ calleeName ]();
                }
                else {
                    console.log( "unexpected condition : no matched function");
                    this.unexpected();
                }
            }
        }
        catch (error) {
            console.log(error.name);
            console.log(error.message);
            
            testResult.fail();
        }
        finally {
            this.tearDown();
            if ( testResult )
            {
                testResult.output();
            }   
        }
    }

    unexpected() {
        Tests["unexpected condition. " + this.context] = false;
    }

    tearDown() {
        console.log("tear down : " + this.context.requestName);
        if ( this.context.autoClose )
        {
            this.context.terminator();
        }
    }
}