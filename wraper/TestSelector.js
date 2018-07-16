class TestSelector 
{
    constructor()
    {
        this.selectors = [];
        this.step = 0;
    }

    clearSelectors() {
        this.selectors = [];
    }

    addSelector(selector) {
        if (typeof selector === "function") {
            this.selectors.push(selector);
        }
        else if ( typeof selector === "string") {
            this.addSelector(() => selector);
        }
    }

    schedule(selectors) // reset selectors
    {
        this.clearSelectors();

        for (let selector of selectors) {
            this.addSelector(selector);
        }
    }

    static selectHttpStatus(context) {
        let statusText = context.statusText.replace(/ /g, "_").toLowerCase();
        return "expect_" + statusText + "_" + context.expectedCode;
    }

    static selectStartWithTest( testObject )
    {

    }

    hasNextTest()
    {
        return this.step < this.selectors.length;
    } 

    nextTest()
    {
        this.step++;
    }
    
    selectTest( context )
    {
        return selectors[ this.step ]( context );
    }
}