class TestSelector 
{
    constructor()
    {
        this.selectors = [];
        this.step = 0;
        this._conditions = new Map();
        this._conditions.set( "" );

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

    fetchCondition( methodName)
    {
        if ( this._startsWithPrefix( methodName ) )
        {
            const index = methodName.indexOf( "if" );

            if ( index !== -1 )
            {
                let condition = methodName.slice( index + 2 );

                if ( this._conditions.has( condition ) )
                {
                    this._conditions.get( condition ).push( condition );        
                }   
                else
                {
                    this._conditions.set( condition, [] );
                }
            }
            else
            {

            }
        }
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
}