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
            this.testResult = new ( eval( "(" + Utils.getVariable( "Tests" ) + ")" ) )();
        }
        return this.testResult;
    }

    createTestClass( className )
    {
        let testClass = eval( `new ${ className }();` );
        return testClass;
    }
}

