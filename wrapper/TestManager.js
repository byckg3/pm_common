class TestManager
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testCollector = null;
       
        this.accessController =  new ( eval( "(" + Utils.getVariable( "AccessController" ) + ")" ) )();
    }


    getTestContext()
    {
        if ( !this.testContext )
        {
            let TestContext = eval( "(" + Utils.getVariable( "TestContext" ) + ")" );
           
            this.testContext = new Proxy( new TestContext(), this.accessController.privateModifier );
        }
       
        return this.testContext;
    }

    getTestSelector()
    {
        if ( !this.testSelector )
        {
            let TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
       
            this.testSelector = new Proxy( new TestSelector(), this.accessController.privateModifier );
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
                    //console.log( key + "called" );
                    target.addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testCollector = new Proxy( new TestCollector(), proxyHandler );
        }
        
        return this.testCollector; 
    }

    createTestObject( testClass )
    {
        let context = this.getTestContext();
        let selector = this.getTestSelector();
        let collector = this.getTestCollector();
     
        return new testClass( context, selector, collector );
    }

    executeTests( testClass )
    {
        let testObject = this.createTestObject( testClass );
        testObject.run();
    }
}

