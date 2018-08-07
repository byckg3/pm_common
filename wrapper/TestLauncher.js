class TestLauncher
{
    constructor( testObject  )
    {
        this.testObject = testObject;
        this.testClass = testObject.constructor;
        this._methodNames = [];
    }

    discover()
    {
        const testPrototype = Object.getPrototypeOf( this.testObject );
        for ( let eachName of Object.getOwnPropertyNames( testPrototype ) )
        {
            if ( typeof this.testObject[ eachName ] !== "function" || this.testObject[ name ] === this.testClass )
            {
                continue;
            } 
            this._methodNames.push( eachName );   
        }
    }

    run( testObject ) 
    {
		try {
            console.log( "setup : " + this.testContext.requestName);
			testObject.setUp();
            
			while ( testObject.selector.hasNext() ) 
			{   
				let calleeName = testObject.selector.next( testObject );

                if ( ( calleeName in testObject ) && ( typeof testObject[ calleeName ] === "function" ) ) 
                {
                    console.log( `Executing : ${ calleeName }` );
                    testObject[ calleeName ]();
                }
                else 
                {
                    console.log( "unexpected condition : no matched method");
                    testObject.unexpected();
                }
            }
        }
        catch (error) 
        {
            const errMsg = `${ error.name } : ${ error.message }`;
            console.log(errMsg);       
            testObject.reporter.addTestResult( errMsg, false );
        }
        finally 
        {
            console.log( "tear down : " + this.testContext.requestName );
            testObject.tearDown();
            if ( testObject.reporter )
            {   
                testObject.reporter.results();
            }   
        }
    }
}