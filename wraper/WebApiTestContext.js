class WebApiTestContext // value object
{
    constructor() {
        this.attributes = new Map();
        this.autoClear = false;
       
        this.initializer();
    }

    initializer() { }

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
    getAttribute( key )
    {
        return this.attributes.get( key ); 
    }

    getAttributeNames()
    {
        return this.attributes.keys();
    }

    setAttribute( key, value )
    {
        this.attributes.set( key, value );
        Object.defineProperty( this, key,  
                { 
                    configurable : true,
                    enumerable : true,   
                    get : () => { return this.getAttribute( key ) },
                    set : ( value ) => { this.setAttribute( key, value ) }
                }                                  
        );
    }

    setGlobalAttribute( key, value )
    {
        this.setAttribute( key, value );
        Utils.setGlobalVariable( key, value );
        InitializerBuilder.buildInitializer( key, value );    
    }

    setEnvironmentAttribute( key, value )
    {
        this.setAttribute( key, value );
        Utils.setEnvironmentVariable( key, value );
        InitializerBuilder.buildInitializer( key, value );
    }

    restoreAttribute( key )
    {
        let value = Utils.getVariable( key );
        this.setAttribute( key, value );

        return value;
    }

    removeAttribute( key )
    {
        this.attributes.delete( key );

        delete this[ key ];

        Utils.removeVariable( key );

        InitializerBuilder.buildInitializer( key );
    }

    clearAttributes()
    {
        for ( let eachName of this.getAttributeNames() ) 
        {
            delete this[ eachName ];
            Utils.removeVariable( eachName );
        }

        this.attributes.clear();

        InitializerBuilder.buildInitializer();
    }

    toString() 
    {
        let displayedMessage = "";
        for ( let [ key, value ] of this.attributes.entries() ) {
            displayedMessage += `${ key} : ${ value }\t`;
          }
        return displayedMessage;
    }
}