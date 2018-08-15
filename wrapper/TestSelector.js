class TestSelector 
{
    constructor()
    {
        this.selectors = [];
        this.step = 0;
        this._conditions = new Map();
        this._conditions.set( "common_condition", [] );

        this.schedule( [ "common_tests" ] );
        this.addSelector( this.selectHttpStatus );
        this._prefixes = [ "test", "expect", "assert", "assume" ];
    }

    clearSelectors() {
        this.selectors = [];
    }

    addSelector(selector) {
        if ( typeof selector === "function" ) {
            this.selectors.push(selector);
        }
        else if ( typeof selector === "string") {
            this.selectors.push( () => selector );
        }
    }

    schedule( selectors ) // reset selectors
    {
        this.clearSelectors();

        for (let selector of selectors) {
            this.addSelector(selector);
        }
    }

    selectHttpStatus( testObject ) 
    {   
        let status = testObject.context.statusText.replace(/ /g, "_").toLowerCase();
        return "expect_" + status + "_" + testObject.expectedCode;
    }

   

    // methods of iterator
    hasNext()
    {
        return this.step < this.selectors.length;
    } 

    next( testObject )
    {   
        return this.selectors[ this.step++ ]( testObject );
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

    _fetchCondition( methodName)
    {
        let condition = "";
        const index = methodName.indexOf( "if" ) + "if".length + 1;
        
        if ( this._isConditional( methodName ) )
        {
            condition = methodName.slice( index );

            this._dispatchMethodByCondition( methodName, condition );
        }
        else
        {
            this._dispatchMethodByCondition( methodName, "common_condition" )
        }
        return condition;
    }

    _isConditional( methodName )
    {
        if ( methodName.indexOf( "if" ) !== -1)
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
        if ( this._conditions.has( condition ) )
        {
            this._conditions.get( condition ).push( methodName );        
        }   
        else
        {
            this._conditions.set( condition, [] );
        }
    }
}