class WebApiTestContext // value object
{
    constructor() {
        this.attributes = new Map();
        // default expected value
        this.setAttribute( "expectedCode", 200 );
        this.setAttribute( "expectedTime", 5000 );
        this.initializer();
    }

    initializer() {
        // init content
     }
    
    // request info
    get requestName() {
        return pm.info.requestName;
    }
    get requestId() {
        return pm.info.requestId;
    }
    get requestUrl() {
        return pm.request.url;
    }
    get requestBodyText() {
        return pm.request.body[ pm.request.body.mode ];
    }
    // response info
    get statusText() {
        return pm.response.status;
    }
    get statusCode() {
        return pm.response.code;
    }
    get responseTime() {
        return pm.response.responseTime;
    }
    get responseText() {
        return pm.response.text();
    }
    get responseJson() {
        return pm.response.json();
    }
    // others
    toString() {

        let expectedValues = "";
        for (let property in this) {
            if (property.includes( "expected" )) {
                expectedValues += ( property + " : " + this[ property ] + "\t" );
            }
        }
        return expectedValues;
    }

    getAttribute( key )
    {
        return this.attributes.get( key ); 
    }

    setAttribute( key, value )
    {
        this.attributes.set( key, value );
        if ( this.hasOwnProperty( key ) )
        {
            this[ key ] = value;
        }
        else
        {
            Object.defineProperty( this, key,  
                    { 
                        configurable : true,
                        enumerable : true,   
                        get : function() { return this.getAttribute( key ) },
                        set : function( value ) { this.attributes.set( key, value ) }
                    }                                  
            );
        }
    }

    deleteAttribute( key )
    {
        this.attributes.delete( key );
        delete this[ key ];
    }

    addAttribute( key, value )
    {
        this.setAttribute( key, value );
        
        
    }

    removeAttribute( key )
    {
        this.attributes.delete( key );

        let contextCodeString = Utils.getVariable( "TestContext" );
        let initializerContent = InitializerBuilder.getInitializerContent( contextCodeString );
      
        let removalPattern = new RegExp( `\\s*this\\.setAttribute\\(\\s*"${ key }",.*\\);`, "gm" );
        let initializerNewContent = initializerContent.replace( removalPattern, "" );
        

        Utils.setGlobalVariable( "TestContext", 
                                 contextCodeString.replace( initializerContent, 
                                                            `${ initializerNewContent }` ) );
    }

    clearAttributes()
    {
        this.attributes.clear();

        let contextCodeString = Utils.getVariable( "TestContext" );
        let initializerContent = InitializerBuilder.getInitializerContent( contextCodeString );

        Utils.setGlobalVariable( "TestContext", 
                                 contextCodeString.replace( initializerContent, " " ) );
    }
}