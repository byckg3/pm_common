class TestManager
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testReporter = null;
        this.testAsserter = null;
        this.testTemplate = null;
        this.testObject = null;
        
        this.contextCodeString = `( ${ Utils.getVariable( "TestContext" ) } )`;
        this.selectorCodeString = `( ${ Utils.getVariable( "TestSelector" ) } )`;
        this.reporterCodeString = `( ${ Utils.getVariable( "TestReporter" ) } )`;
        this.asserterCodeString = `( ${ Utils.getVariable( "TestAsserter" ) } )`;
        this.templateCodeString = `( ${ Utils.getVariable( "TestTemplate" ) } )`;   
        this.launcherCodeString = `( ${ Utils.getVariable( "TestLauncher" ) } )`; 
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
            const reporter = this.getTestReporter();
            const Asserter = eval( this.asserterCodeString );
            const proxyHandler = { 
                set( target, key, value )
                {
                    reporter.addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testAsserter = new Proxy( new Asserter( reporter ), proxyHandler );
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
        const reporter = this.getTestReporter();
        
        const proxyHandler = { 
            get( targetObj, key )
            {
                const value = Reflect.get( targetObj, key );
                // if ( typeof value === "function" )
                // {
                //     console.log( `Executing : ${ key }()` );
                // } 
                return value;
            }
        };
        const obj = new TestClass( context, selector, reporter );
        return new Proxy( obj, proxyHandler );
    }

    executeTests( TestClass )
    {
        this.testObject = this.createTestObject( TestClass );
        const TestLauncher = eval( this.launcherCodeString );
        
        new TestLauncher( this.testObject ).execute();
    }
}

