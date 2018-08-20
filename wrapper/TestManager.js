class TestManager
{
    static import( libName )
    {
        return eval( "(" + pm.variables.get( libName ) + ")" );
    }

    static get factory()
    {
        if ( !this._factory )
        {
            this._factory = this.import( "SimpleFactory" );
        }
        return this._factory;
    }
    
    static getTestContext()
    {   
        if ( !this._context )
        {   
            this._context = this.factory.createContext( this );
        } 
        return this._context;
    }

    static getTestSelector()
    {
        if ( !this._selector )
        {   
            this._selector = this.factory.createSelector();
        }
        return this._selector;
    }

    static getTestReporter()
    {   
        if ( !this._reporter )
        {
            this._reporter = this.factory.createReporter();
        } 
        return this._reporter; 
    }

    static getTestAsserter()
    {
        if ( !this._asserter )
        {
            const reporter = this.getTestReporter();
            const asserter = this.factory.createAsserter( reporter );
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

    static getTestTemplate()
    {
        if ( !this._testTemplate )
        {                         
            this._testTemplate = this.createTestObject(  this.factory.templateConstructor );
        }
        return this._testTemplate;
    }

    static createTestObject( TestClass )
    {   
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
        const obj = new TestClass( this );
        return new Proxy( obj, proxyHandler );
    }

    static executeTests( TestClass )
    {
        this._testObject = this.createTestObject( TestClass );   
        this.factory.createLauncher( this._testObject, this ).execute();
    }
}

