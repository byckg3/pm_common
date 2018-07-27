class TestFactory
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testCollector = null;

        this.testContextInstance = null;
        this.testSelectorInstance = null;
        this.testCollectorInstance = null;

        this.accessController = null;
    }


    getTestContext()
    {
        if ( !this.testContext )
        {
            this.testContext = eval( "(" + Utils.getVariable( "TestContext" ) + ")" );
        }

        if ( !this.testContextInstance )
        {
            this.testContextInstance = new Proxy( new this.testContext(), this.accessController );
        }

        return this.testContextInstance;
    }

    getTestSelector( testClass )
    {
        if ( !this.testSelector )
        {
            this.testSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
        }

        if ( !this.testSelectorInstance )
        {
            this.testSelectorInstance = new Proxy( new this.testSelector(), this.accessController );
        }
        return new this.testSelectorInstance( testClass );
    }

    getTestCollector()
    {
        if ( !this.testCollector )
        {
            this.testCollector = eval( "(" + Utils.getVariable( "Tests" ) + ")" );
        }

        if ( !this.testCollectorInstance )
        {
            const proxyHandler = { 
                set( target, key, value )
                {
                    target.addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testCollectorInstance = new Proxy( new this.testCollector(), proxyHandler );
        }
        
        return this.testCollectorInstance; 
    }

    createTestClass( className )
    {
        let testClass = eval( `new ${ className }();` );
        return testClass;
    }
}

