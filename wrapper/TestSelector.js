class TestSelector 
{
    constructor( manager )
    {
        this.conditionSelectors = [];
        this.conditionStep = 0;
        
        this._conditions = new Map();
        this._conditions.set( "common", [] );

        this.executionQueue = [];
        this.executionOrder = 0;

        this.analyser = manager.import( "MethodAnalyser" );
    }

    clearSelectors() {
        this.conditionSelectors = [];
    }

    addSelector(selector) {
        if ( typeof selector === "function" ) {
            this.conditionSelectors.push(selector);
        }
        else if ( typeof selector === "string") {
            this.conditionSelectors.push( () => selector );
        }
    }

    schedule( selectors ) // reset selectors
    {
        this.clearSelectors();

        for ( let selector of selectors ) 
        {
            this.addSelector( selector );
        }
    }

    selectHttpStatus( statusCode ) 
    {   
        this.addSelector( 
            ( testObject ) => { 
                testObject.expectedCode = statusCode;       
                const expectedCode = testObject.expectedCode; 
                const actualCode = testObject.context.statusCode;

                let result = "http_status_" + actualCode;
                if ( expectedCode !== actualCode )
                {
                    result = "unexpected";
                }
                return result;
            } 
        );
    }

    selectCondition( conditionName )
    {
        this.executionQueue = this._conditions.get( conditionName );
        this.executionOrder = 0;
    }


    analyze( methodName, testObj )
    {
        if ( this.analyser.isTestableMethod( methodName ) )
        {
            const conditionName = this.analyser.getCondition( methodName );

            this._dispatchMethodByCondition( methodName, conditionName );
        }
        else if ( this.analyser.isSelector( methodName ) )
        {  
            this.addSelector( testObj[ methodName ] );
        }
    }
    
    // methods of iterator
    hasNext()
    {
        return this._hasNextTest() || this._hasNextCondition();
    } 

    hasNextTest()
    {
        return this.executionOrder < this.executionQueue.length;
    }

    hasNextCondition()
    {
        return this.conditionStep < this.conditionSelectors.length; 
    }

    nextTest()
    {
        return this.executionQueue[ this.executionOrder++ ];
    }

    nextCondition( testObject )
    {
        const conditionSelectorMethod = this.conditionSelectors[ this.conditionStep++ ];
        return conditionSelectorMethod.call( testObject, testObject );
    }

    isExpectedCondition( conditionName )
    {
        return this.conditionExists( conditionName ) && ( conditionName !== "unexpected" ); 
    }

    conditionExists( conditionName )
    {
        return this._conditions.has( conditionName );
    }

    _dispatchMethodByCondition( methodName, condition )
    {
        if ( !this._conditions.has( condition ) )
        {
            this._conditions.set( condition, [] );        
        }   
        this._conditions.get( condition ).push( methodName ); 
    }
}