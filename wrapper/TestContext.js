class TestContext
{
    constructor( manager ) 
    {    
        this.autoClear = false;

        this._attributes = new Map();
        this._attributeBuilder = manager.import( "InitializerBuilder" );

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
    get requestBodyJson() {
        return JSON.parse( this.requestBodyText );
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
    hasAttribute( key )
    {
        return this._attributes.has( key );
    }

    getAttribute( key )
    {
        return this._attributes.get( key ); 
    }

    getAttributeNames()
    {
        return this._attributes.keys();
    }

    setAttribute( key, value )
    {
        this._attributes.set( key, value );
        Object.defineProperty( this, key,  
                { 
                    configurable : true,
                    enumerable : true,   
                    get : () => { return this.getAttribute( key ) },
                    set : ( value ) => { this.setAttribute( key, value ) }
                }                                  
        );
        this._attributeBuilder.build( key, value );  
    }

    setGlobalAttribute( key, value )
    {
        this.setAttribute( key, value );
        Utils.setGlobalVariable( key, value );
    }

    setEnvironmentAttribute( key, value )
    {
        this.setAttribute( key, value );
        Utils.setEnvironmentVariable( key, value );
    }

    restoreAttribute( key, value )
    {
        try
        {
            if ( Utils.hasVariable( key ) )
            {
                value = Utils.getVariable( key );
            }
            else
            {
                value = JSON.parse( value );
            }   
        }
        catch( err )
        {
                   
        }
        this.setAttribute( key, value );

        return value;
    }

    removeAttribute( key )
    {
        this._attributes.delete( key );

        delete this[ key ];

        Utils.removeVariable( key );

        this._attributeBuilder.build( key );
    }

    clearAttributes()
    {
        for ( let eachName of this.getAttributeNames() ) 
        {
            delete this[ eachName ];
            Utils.removeVariable( eachName );
        }

        this._attributes.clear();

        this._attributeBuilder.build();
    }

    toString() 
    {
        let displayedMessage = "";
        for ( let [ key, value ] of this._attributes.entries() ) {
            displayedMessage += `${ key} : ${ value }\t`;
          }
        return displayedMessage;
    }
}