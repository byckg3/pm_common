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
    
    }
    
    import( libName )
    {
        return eval( `( ${ this.getVariable( libName ) } )` );
    }

    getTestContext()
    {   
        if ( !this.testContext )
        {   
            this.testContext = SimpleFactory.createContext();
        } 
        return this.testContext;
    }

    getTestSelector()
    {
        if ( !this.testSelector )
        {   
            this.testSelector = SimpleFactory.createSelector();
        }
        return this.testSelector;
    }

    getTestReporter()
    {   
        if ( !this.testReporter )
        {
            this.testReporter = SimpleFactory.createReporter();
        } 
        return this.testReporter; 
    }

    getTestAsserter()
    {
        if ( !this.testAsserter )
        {
            const reporter = this.getTestReporter();
            const asserter = SimpleFactory.createAsserter( reporter );
            const proxyHandler = { 
                set( targetAsserter, key, value )
                {
                    reporter.addTestResult( key, value );
                    return Reflect.set( targetAsserter, key, value );
                }
            };
            this.testAsserter = new Proxy( asserter, proxyHandler );
        }
        return this.testAsserter;
    }

    getTestTemplate()
    {
        if ( !this.testTemplate )
        {                         
            this.testTemplate = this.createTestObject(  SimpleFactory.templateConstructor );
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
        
        SimpleFactory.createLauncher( this.testObject ).execute();
    }
}

