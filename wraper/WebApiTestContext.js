class WebApiTestContext // value object
{
    constructor() {
        this.attributes = new Map();
        // default expected value
        Object.defineProperty( this, "expectedCode",  { 
                                                            configurable : true,
                                                            enumerable : true,   
                                                            writable : true,
                                                            get : function() { return this.getAttribut( "expectedCode" ) },
                                                            set : function( value ) { this.attributes.set( "expectedCode", value ) }
                                                        } 
                                     
        );
        this.expectedCode = 200;
        this.expectedTime = 5000;

        this.initialize();
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
    }

    addAttribute( key, value )
    {
        this.setAttribute( key, value );
        
        let contextCode = Utils.getVariable( "TestContext" );
        let insertionCode = `this.setAttribute( "${ key }", "${ value }" );`;
        let regExp = /initialize\s*\([\s\w,.]*\)\s*{([\s\w/.,=;"()]*)\s*}$/m; 

        let result = regExp.exec( contextCode );
        console.log( "(1) : " + result[ 1 ]);

        Utils.setGlobalVariable( "TestContext", 
                                 contextCode.replace( regExp, `initialize() {$1\n\t\t${ insertionCode } }` ) );
    }

    removeAttribute( key )
    {
        this.attributes.delete( key );

        let contextCode = Utils.getVariable( "TestContext" );
        let regExp = /initialize\s*\([\s\w,.]*\)\s*{([\s\w/.,=;"()]*)}$/m;

        let result = regExp.exec( contextCode );
        console.log( "(1) : " + result[ 1 ] );
        let deletionCode = new RegExp( `\\s*this\\.setAttribute\\(\\s*"${ key }",.*\\);`, "gm" );
        let codeString = result[ 1 ].replace( deletionCode, "" );
        

        Utils.setGlobalVariable( "TestContext", 
                                 contextCode.replace( regExp, `initialize() {${ codeString }}` ) );
    }

    clearAttributes()
    {
        this.attributes.clear();

        let contextCode = Utils.getVariable( "TestContext" );
        let regExp = /initialize\s*\([\s\w,.]*\)\s*{([\s\w/.,=;"()]*)}$/m; 

        let result = regExp.exec( contextCode );
        console.log( "(1) : " + result[ 1 ]);

        Utils.setGlobalVariable( "TestContext", 
                                 contextCode.replace( regExp, `initialize() { }` ) );
    }

    initialize() { }
}