class TestManager
{
    constructor()
    {
        this._context = null;
        this._selector = null;
        this._reporter = null;
        this._asserter = null;

        this._testTemplate = null;
        this._testObject = null;

        this._factory = Utils.import( "SimpleFactory" );
    }

    getTestContext()
    {   
        if ( !this._context )
        {   
            this._context = this._factory.createContext();
        } 
        return this._context;
    }

    getTestSelector()
    {
        if ( !this._selector )
        {   
            this._selector = this._factory.createSelector();
        }
        return this._selector;
    }

    getTestReporter()
    {   
        if ( !this._reporter )
        {
            this._reporter = this._factory.createReporter();
        } 
        return this._reporter; 
    }

    getTestAsserter()
    {
        if ( !this._asserter )
        {
            const reporter = this.getTestReporter();
            const asserter = this._factory.createAsserter( reporter );
            const proxyHandler = { 
                set( targetAsserter, key, value )
                {
                    reporter.addTestResult( key, value );
                    return Reflect.set( targetAsserter, key, value );
                }
            };
            this._asserter = new Proxy( asserter, proxyHandler );
        }
        return this._asserter;
    }

    getTestTemplate()
    {
        if ( !this._testTemplate )
        {                         
            this._testTemplate = this.createTestObject(  this._factory.templateConstructor );
        }
        return this._testTemplate;
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
        this._testObject = this.createTestObject( TestClass );
        const TestLauncher = eval( this.launcherCodeString );
        
        this._factory.createLauncher( this._testObject ).execute();
    }
}

