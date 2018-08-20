class SimpleFactory
{
    static createManager()
    {
        return new ( this.managerConstructor )();
    }
    static get managerConstructor()
    {
        return eval( this.managerCodeString );
    }
    static get managerCodeString()
    {
        return `( ${ Utils.getVariable( "TestManager" ) } )`;
    }
    
    static createContext( ...args )
    {
        return new ( this.contextConstructor )( ...args );
    }
    static get contextConstructor()
    {
        return eval( this.contextCodeString );
    }
    static get contextCodeString()
    {
        return `( ${ Utils.getVariable( "TestContext" ) } )`;
    }
    
    static createReporter( ...args )
    {
        return new ( this.reporterConstructor )( ...args );
    }
    static get reporterConstructor()
    {
        return eval( this.reporterCodeString );
    }
    static get reporterCodeString()
    {
        return `( ${ Utils.getVariable( "TestReporter" ) } )`;
    } 
    
    static createAsserter( reporter )
    {  
        return new ( this.asserterConstructor )( reporter );
    }
    static get asserterConstructor()
    {
        return eval( this.asserterCodeString );
    }
    static get asserterCodeString()
    {
        return `( ${ Utils.getVariable( "TestAsserter" ) } )`;
    }
    
    static createTemplate( ...args )
    {  
        return new ( this.templateConstructor )( ...args );
    }
    static get templateConstructor()
    {
        return eval( this.templateCodeString );
    }
    static get templateCodeString()
    {
        return `( ${ Utils.getVariable( "TestTemplate" ) } )`;   
    } 

    static createSelector( ...args )
    {  
        return new ( this.selectorConstructor )( ...args );
    }
    static get selectorConstructor()
    {
        return eval( this.selectorCodeString );
    }
    static get selectorCodeString()
    {
        return `( ${ Utils.getVariable( "TestSelector" ) } )`;
    } 
    
    static createLauncher( ...args )
    {  
        return new ( this.launcherConstructor )( ...args );
    }
    static get launcherConstructor()
    {
        return eval( this.launcherCodeString );
    }
    static get launcherCodeString()
    {
        return `( ${ Utils.getVariable( "TestLauncher" ) } )`; 
    } 

}