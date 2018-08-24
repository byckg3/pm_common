class CreationApiFunctionalTestTemplate extends TestTemplate
{
    constructor( manager )
    {
        super( manager );
        this.fields = new Map();
    }

    setField()
    {

    }

    setUp()
    {
        this.context.clearAttributes();
        // pay attention to overflow
        // if contactNo > Number.MAX_SAFE_INTEGER => JSON.parse() will get a incorrect contactNo 
        let start = this.context.responseText.indexOf( "contactNo" ) + "contactNo".length + 1;
        this.contactNo = Utils.getBoundedString( this.context.responseText, ":", "}", start );
    }
    
    test_creation_successful()
    {
        super.test_http_status_code( 200 );
        
        Tests.assertTrue(  );
    }
    after_test_creation_successful()
    {
        this.context.setEnvironmentAttribute( "contactNo", this.contactNo );
        this.context.setAttribute( "expectedContactData", this.context.requestBodyJson  );
        this.context.setAttribute( "contactExists", true );
    }
}