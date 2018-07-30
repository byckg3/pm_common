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

    selectHttpStatus( testClass ) 
    {   
        let status = testClass.context.statusText.replace(/ /g, "_").toLowerCase();
        return "expect_" + status + "_" + testClass.expectedCode;
    }

    selectTestNameStartsWith( prefix = "test" )
    {
            
    }
    // methods of iterator
    hasNext()
    {
        return this.step < this.selectors.length;
    } 

    next( testClass )
    {   
        return this.selectors[ this.step++ ]( testClass );
    }
}