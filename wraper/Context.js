function Context() 
{
    // request info
    this.requestName = pm.info.requestName;
    this.requestId = pm.info.requestId;
    this.requestBodyText = pm.request.body[ pm.request.body.mode ];

    // response info
    this.statusText = pm.response.status;
    this.statusCode = pm.response.code;
    this.responseTime = pm.response.responseTime;
    this.responseText = pm.response.text();

    // default expected value
    this.expectedCode = 200;    
    this.expectedTime = 5000;
    
    // others
    this.message = "";
    this.toString = 
    function()
    {
        console.log( [ this.statusCode, this.statusText, ", time : " + this.responseTime + " ms" ].join( " " ) );
        console.log( "Response :\n" + this.responseText );
        return this.responseText;
    };
}