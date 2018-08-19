class TestSelector 
{
    constructor()
    {
        this.conditionSelectors = [];
        this.conditionStep = 0;
        
        this._conditions = new Map();
        this._conditions.set( "common", [] );

        this.executionQueue = [];
        this.executionOrder = 0;

        this._prefixes = [ "test", "expect", "check" ];

        this.schedule( [ "common" ] );
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

        for (let selector of selectors) 
        {
            this.addSelector(selector);
        }
    }

    selectHttpStatus( testObject ) 
    {   
        const expectedCode = testObject.expectedCode; 
        const actualCode = testObject.context.statusCode;
        if ( expectedCode !== actualCode )
        {
            return "unexpected";
        }
        return "status_" + expectedCode; 
    }

    selectCondition( conditionName )
    {
        this.executionQueue = this._conditions.get( conditionName );
        this.executionOrder = 0;
    }


    analyze( methodName )
    {
        if ( this.isTestableMethod( methodName ) )
        {
            const conditionName = this._fetchCondition( methodName );

            this._dispatchMethodByCondition( methodName, conditionName );
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
        return this.conditionSelectors[ this.conditionStep++ ]( testObject );
    }

    isTestableMethod( methodName )
    {
        return  this._startsWithPrefix( methodName );
    }

    isExpectedCondition( conditionName )
    {
        return this.conditionExists( conditionName ) && ( conditionName !== "unexpected" ); 
    }

    conditionExists( conditionName )
    {
        return this._conditions.has( conditionName );
    }

    _startsWithPrefix( methodName )
    {
        for ( let prefix of this._prefixes )
        {
            if ( methodName.startsWith( prefix ) )
            {
                return true;
            }
        }
        return false;
    }

    _fetchCondition( methodName )
    {
        let condition = "common";
        
        if ( this._isConditional( methodName ) )
        {
            const index = methodName.toLowerCase().indexOf( "if" ) + "if".length + 1;
            condition = methodName.slice( index );
        }
        return condition;
    }

    _isConditional( methodName )
    {
        if ( methodName.toLowerCase().indexOf( "if" ) !== -1)
        {
            return true;
        }
        else
        {
            return false;
        }
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