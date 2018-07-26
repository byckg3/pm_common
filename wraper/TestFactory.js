class TestFactory
{
    constructor()
    {
        this.testContext = null;
        this.testSelector = null;
        this.testResult = null;
    }

    getTestContext()
    {
        if ( !this.testContext )
        {
            this.testContext = eval( "(" + Utils.getVariable( "TestContext" ) + ")" );
        }
        return new this.testContext();
    }

    getTestSelector( testClass )
    {
        if ( !this.testSelector )
        {
            this.testSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
        }
        return new this.testSelector( testClass );
    }

    getTestResult()
    {
        if ( !this.testResult )
        {
            let TestResult = eval( "(" + Utils.getVariable( "Tests" ) + ")" );

            this.testResult = new TestResult();
        }

        const proxyHandler = { 
            set( target, key, value )
            {
                target.addTestResult( key, value );
                return Reflect.set( target, key, value );
            }
        };

        return new Proxy( this.testResult, proxyHandler );
    }

    createTestClass( className )
    {
        let testClass = eval( `new ${ className }();` );
        return testClass;
    }
}

