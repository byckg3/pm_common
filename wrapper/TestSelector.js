class TestSelector 
{
    constructor()
    {
        this.selectors = [];
        this.step = 0;

        this.schedule( [ "common_tests" ] );
        this.addSelector( this.selectHttpStatus );
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

    selectMethodNameInclude( prefix = "test" )
    {
            
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
}