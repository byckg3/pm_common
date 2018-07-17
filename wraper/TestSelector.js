class TestSelector 
{
    constructor( testObj )
    {
        this.testClass = testObj;
        this.testContext = testObj.context;
     
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

    selectHttpStatus() 
    {   
        let status = this.testContext.statusText.replace(/ /g, "_").toLowerCase();
        return "expect_" + status + "_" + this.testContext.expectedCode;
    }

    selectTestNameStartsWith( prefix = "test" )
    {
            
    }
    // methods of iterator
    hasNext()
    {
        return this.step < this.selectors.length;
    } 

    next()
    {   
        return this.selectors[ this.step++ ].call( this );
    }
}