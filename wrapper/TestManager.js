class TestManager
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testCollector = null;
       
        this.accessController = {};
    }


    getTestContext()
    {
        if ( !this.testContext )
        {
            let TestContext = eval( "(" + Utils.getVariable( "TestContext" ) + ")" );
           
            this.testContext = new Proxy( new TestContext(), this.accessController );
        }
       
        return this.testContext;
    }

    getTestSelector()
    {
        if ( !this.testSelector )
        {
            let TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
       
            this.testSelector = new Proxy( new TestSelector(), this.accessController );
        }
        return this.testSelector;
    }

    getTestCollector()
    {
        if ( !this.testCollector )
        {
            let TestCollector = eval( "(" + Utils.getVariable( "Tests" ) + ")" );
       
            const proxyHandler = { 
                set( target, key, value )
                {
                    target.addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testCollector = new Proxy( new TestCollector(), proxyHandler) ;
        }
        
        return this.testCollector; 
    }

    createTestClass( className )
    {
        let testClass = eval( `new ${ className }();` );
        return testClass;
    }

    executeTests( className )
    {
        let context = this.getTestContext();
        let selector = this.getTestSelector();
        let collector = this.getTestCollector();
     
        let testClass = eval( `new ${ className }( context, selector, collector );` );
        
        testClass.run();
    }
}

