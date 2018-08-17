class TestLauncher
{   
    constructor( testObj )
    {
        this.testObject = testObj;
        this.testClass = testObj.constructor;
        this._methodNames = [];
    }

    discover()
    {
        const testPrototype = Object.getPrototypeOf( this.testObject );
        for ( let eachPropertyName of Object.getOwnPropertyNames( testPrototype ) )
        {
            if ( this._isTestableMethod( eachPropertyName ) )
            {
                this._methodNames.push( eachPropertyName );  
            } 
        }
    }

    execute() 
    {
        const testObject = this.testObject;
		try {
            console.log( `${ testObject.context.requestName } :` );
		
            this._call( "setUp" );

			while ( testObject.selector.hasNext() ) 
			{   
				let calleeName = testObject.selector.next( testObject );

                if ( this._isCallableMethod( calleeName, testObject ) )
                {   
                    this._call( "beforeEachTest" );
                    
                    this._call( "before_" + calleeName );

                    this._call( calleeName ); // main test function

                    this._call( "after_" + calleeName );
                    
                    this._call( "afterEachTest" );
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
            this.testObject.reporter.addTestResult( errMsg, false );
        }
        finally 
        {
            this._call( "tearDown" );
            if ( this.testObject.reporter )
            {   
                this.testObject.reporter.results();
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
                    if ( targetMethod.name !== "unexpected" )
                    {
                        console.log( `Executing : ${ targetMethod.name }()` );
                    }
                    else
                    {
                        console.log( "unexpected condition : no matched method");
                    }
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

    _isTestableMethod( propertyName )
    {
        const isFunction = typeof this.testObject[ propertyName ] === "function"; 
        const isConstructor = this.testObject[ propertyName ] === this.testClass;
        const isTemplateMethod = [ "setUp", "tearDown", "unexpected" ].includes( propertyName );

        return isFunction && !isConstructor && !isTemplateMethod;
    }
}