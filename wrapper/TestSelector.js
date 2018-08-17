class TestSelector 
{
    constructor()
    {
        this.conditionSelectors = [];
        this.step = 0;
        
        this._conditions = new Map();
        this._conditions.set( "common_condition", [] );

        this.executionQueue = [];
        this.executionOrder = 0;

        this._prefixes = [ "test", "expect", "assert", "assume" ];

        this.schedule( [ "common_condition" ] );
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
        let status = testObject.context.statusText.replace( / /g, "_" ).toLowerCase();
        return "expect_" + status + "_" + testObject.expectedCode; 
    }

    analyze( methodName )
    {
        if ( this.isTestableMethod( methodName ) )
        {
            const conditionName = this._fetchCondition( methodName );

            this._dispatchMethodByCondition( methodName, conditionName );
        }
    }

    selectCondition( conditionName )
    {
        this.executionQueue = this._conditions.get( conditionName );
        this.executionOrder = 0;
    }

    // methods of iterator
    hasNext()
    {
        return this._hasNextTest() || this._hasNextCondition();
    } 

    isTestableMethod( methodName )
    {
        return  this._startsWithPrefix( methodName );
    }

    hasNextTest()
    {
        return this.executionOrder < this.executionQueue.length;
    }

    nextTest()
    {
        return this.executionQueue[ this.executionOrder++ ];
    }

    hasNextCondition()
    {
        return this.step < this.conditionSelectors.length; 
    }

    nextCondition( testObject )
    {
        return this.conditionSelectors[ this.step++ ]( testObject );
    }

    conditionExists( conditionName )
    {
        return this.conditions.has( conditionName );
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
        let condition = "common_condition";
        
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