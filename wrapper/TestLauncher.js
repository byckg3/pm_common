class TestLauncher
{
    constructor( testObject  )
    {
        this.testObject = testObject;
        this.testClass = testObject.constructor;
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

    run( testObject ) 
    {
		try {
            console.log( "setup : " + this.testContext.requestName);
			this.testObject.setUp();
            
			while ( this.testObject.selector.hasNext() ) 
			{   
				let calleeName = this.testObject.selector.next( this.testObject );

                if ( this._isCallableMethod( calleeName ) ) 
                {
                    console.log( `Executing : ${ calleeName }` );
                    this.testObject[ calleeName ]();
                }
                else 
                {
                    console.log( "unexpected condition : no matched method");
                    this.testObject.unexpected();
                }
            }
        }
        catch (error) 
        {
            const errMsg = `${ error.name } : ${ error.message }`;
            console.log(errMsg);       
            this.testObject.reporter.addTestResult( errMsg, false );
        }
        finally 
        {
            console.log( "tear down : " + this.testContext.requestName );
            this.testObject.tearDown();
            if ( this.testObject.reporter )
            {   
                this.testObject.reporter.results();
            }   
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