class TestLauncher
{   
    constructor( testObj, manager )
    {
        this.testObject = testObj;
        this.selector = manager.getTestSelector();
        this.context = manager.getTestContext();
        this.reporter = manager.getTestReporter();

        this.discover();
    }

    discover()
    {
        const testObjPrototype = Object.getPrototypeOf( this.testObject );
        const parentPrototype = Object.getPrototypeOf( testObjPrototype );
        const propertyNames = Object.getOwnPropertyNames( parentPrototype ).concat( Object.getOwnPropertyNames( testObjPrototype ) );

        for ( let eachPropertyName of propertyNames )
        {   
            if ( this._isSelectableMethod( eachPropertyName ) )
            {
                this.selector.analyze( eachPropertyName );  
            } 
        }
    }

    execute() 
    {
        const testObject = this.testObject;
        const selector = this.selector;
        const context = this.context;
        const reporter = this.reporter;
        try 
        {
            console.log( `${ context.requestName } :` );
		
            this._call( "setUp" );
			
            while( selector.hasNextCondition() )
            {
                const conditionName = selector.nextCondition( testObject );
                console.log( `Condition : ${ conditionName }` );
                if ( selector.isExpectedCondition( conditionName ) )
                {
                    selector.selectCondition( conditionName );

                    while( selector.hasNextTest() )
                    {
                        const calleeName = selector.nextTest();

                        this._call( "beforeEachTest" );
                    
                        this._call( "before_" + calleeName );

                        this._call( calleeName ); // main test function

                        this._call( "after_" + calleeName );
                    
                        this._call( "afterEachTest" );
                    }
                }
                else
                {
                    this._call( "unexpected" );
                } 
            }
        }
        catch (error) 
        {
            const errMsg = `${ error.name } : ${ error.message }`;
            console.log( errMsg );       
            reporter.addTestResult( errMsg, false );
        }
        finally 
        {
            this._call( "tearDown" );
            if ( reporter )
            {   
                reporter.results();
            }   
        }
    }

    _call( methodName )
    {
        if ( this._isCallableMethod( methodName, this.testObject ) )
        {
            const proxyLogger = { 
                apply( targetMethod, cxt, args )
                {
                    if ( targetMethod.name.startsWith( "unexpected" ) )
                    {
                        console.log( `unexpected condition : no matched method` );
                    }
                    console.log( `Executing : ${ targetMethod.name }()` );

                    return Reflect.apply( targetMethod, cxt, args );
                }
            };
            return new Proxy( this.testObject[ methodName ], proxyLogger ).apply( this.testObject );
        }
    }

    _isCallableMethod( propertyName )
    {
        return ( propertyName in this.testObject ) && ( typeof this.testObject[ propertyName ] === "function" );
    }

    _isSelectableMethod( propertyName )
    {
        const isFunction = typeof this.testObject[ propertyName ] === "function"; 
        const isConstructor = this.testObject[ propertyName ] === this.testObject.constructor;
        const isTemplateMethod = [ "setUp", "tearDown", "unexpected" ].includes( propertyName );

        return isFunction && !isConstructor && !isTemplateMethod;
    }
}