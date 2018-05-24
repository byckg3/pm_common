function Context() 
{
    this.requestName = request.name;
    this.requestBodyText = pm.request.body[ pm.request.body.mode ];

    this.statusText = pm.response.status;
    this.statusCode = pm.response.code;

    this.responseTime = pm.response.responseTime;
    this.responseText = pm.response.text();
    
    this.toString = 
    function()
    {
        console.log( [ this.statusCode, this.statusText, ", time : " + this.responseTime + " ms" ].join( " " ) );
        console.log( "Response :\n" + this.responseText );
    };
}