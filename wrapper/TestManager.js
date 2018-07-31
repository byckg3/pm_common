class TestManager
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testReporter = null;
        this.testTemplate = null;
        this.accessController = null;

        this.contextCodeString = `( ${ Utils.getVariable( "TestContext" ) } )`;
        this.selectorCodeString = `( ${ Utils.getVariable( "TestSelector" ) } )`;
        this.collectorCodeString = `( ${ Utils.getVariable( "Tests" ) } )`;
        this.templateCodeString = ``;
        
        this.controllerCodeString = `( ${ Utils.getVariable( "AccessController" ) } )`;
    }

    getTestContext()
    {
        if ( !this.accessController )
        {
            this.accessController =  new ( eval( this.controllerCodeString ) )();
        }
        if ( !this.testContext )
        {
            const TestContext = eval( this.contextCodeString );

            this.testContext = new Proxy( new TestContext(), this.accessController.privateModifier );
        } 
        return this.testContext;
    }

    getTestSelector()
    {
        if ( !this.accessController )
        {
            this.accessController =  new ( eval( this.controllerCodeString ) )();
        }
        if ( !this.testSelector )
        {
            const TestSelector = eval( this.selectorCodeString );
       
            this.testSelector = new Proxy( new TestSelector(), this.accessController.privateModifier );
        }
        return this.testSelector;
    }

    getTestReporter()
    {
        if ( !this.accessController )
        {
            this.accessController =  new ( eval( this.controllerCodeString ) )();
        }
        if ( !this.testReporter )
        {
            const TestReporter = eval( this.collectorCodeString );
       
            const proxyHandler = { 
                set( target, key, value )
                {
                    //console.log( key + "called" );
                    target.addTestResult( key, value );
                    return Reflect.set( target, key, value );
                }
            };
            this.testReporter = new Proxy( new TestReporter(), proxyHandler );
        }  
        return this.testReporter; 
    }

    createTestObject( TestClass )
    {
        const context = this.getTestContext();
        const selector = this.getTestSelector();
        const collector = this.getTestReporter();
     
        return new TestClass( context, selector, collector );
    }

    executeTests( TestClass )
    {
        const testObject = this.createTestObject( TestClass );

        testObject.run();
    }
}

