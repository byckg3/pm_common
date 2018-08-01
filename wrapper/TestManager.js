class TestManager
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testReporter = null;
        this.testAsserter = null;
        this.testTemplate = null;
        
        this.contextCodeString = `( ${ Utils.getVariable( "TestContext" ) } )`;
        this.selectorCodeString = `( ${ Utils.getVariable( "TestSelector" ) } )`;
        this.reporterCodeString = `( ${ Utils.getVariable( "TestReporter" ) } )`;
        this.asserterCodeString = `( ${ Utils.getVariable( "TestAsserter" ) } )`;
        this.templateCodeString = `( ${ Utils.getVariable( "TestTemplate" ) } )`;   
        //this.accessController = null;
        //this.controllerCodeString = `( ${ Utils.getVariable( "AccessController" ) } )`;
    }

    getTestContext()
    {
        if ( !this.testContext )
        {
            const TestContext = eval( this.contextCodeString );
            this.testContext = new TestContext();
        } 
        return this.testContext;
    }

    getTestSelector()
    {
        if ( !this.testSelector )
        {
            const TestSelector = eval( this.selectorCodeString );       
            this.testSelector = new TestSelector();
        }
        return this.testSelector;
    }

    getTestReporter()
    {
        if ( !this.testReporter )
        {
            const TestReporter = eval( this.reporterCodeString );  
            this.testReporter = new TestReporter();
        }  
        return this.testReporter; 
    }

    getTestAsserter()
    {
        if ( !this.testAsserter )
        {
            const manager = this;
            const Asserter = eval( this.asserterCodeString );
            const proxyHandler = { 
                set( target, key, value )
                {
                    manager.getTestReporter().addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testAsserter = new Proxy( new Asserter(), proxyHandler );
        }
        return this.testAsserter;
    }

    getTestTemplate()
    {
        if ( !this.testTemplate )
        {
            const TestTemplate = eval( this.templateCodeString );
            this.testTemplate = new TestTemplate();
        }
        return this.testTemplate;
    }

    createTestObject( TestClass )
    {
        const context = this.getTestContext();
        const selector = this.getTestSelector();
        const collector = this.getTestReporter();
     
        const proxyHandler = { 
            ownKeys( target )
            {
                return Reflect.ownKeys( target );
            }
        };
        const obj = new TestClass( context, selector, collector );
        return new Proxy( obj, proxyHandler );
    }

    executeTests( TestClass )
    {
        const testObject = this.createTestObject( TestClass );
        this.run( testObject );
    }

    run( testObject ) 
    {
		try {
			testObject.setUp();
            
			while ( testObject.selector.hasNext() ) 
			{   
				let calleeName = testObject.selector.next(  testObject );

                if ( ( calleeName in testObject ) && ( typeof testObject[ calleeName ] === "function" ) ) 
                {
                    console.log( "Executing : " + calleeName);
                    testObject[ calleeName ]();
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
            testObject.testReporter.fail( errMsg );
        }
        finally {
            testObject.tearDown();
            if ( testObject.testReporter )
            {   
                testObject.testReporter.results();
            }   
        }
    }
}

