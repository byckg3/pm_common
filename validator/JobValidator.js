JobValidator = 
{
    ErrorTypes :
    { 
        "jobUpdateRequest-cantModifiedColumnRole" : "role 欄位不可傳入, 此欄位不可被修改",

        "job-stringType" : "職務名稱必須為 string 類別", 

        "job-notEmpty" : "職務名稱不可為空",

        "job-length" : "職務名稱長度必須介於 1 到 120",

        "jobCatSet-notEmpty" : "職務類別不可為空",

        "jobCatSet-length" : "職務類別長度必須介於 1 到 3",
        
    },

    results : [],
    appendResult :
    function( errorName )
    {
        this.results.push( { "code" : errorName, "message" : this.ErrorTypes[ errorName ] } );
    },

    clear :
    function()
    {
        this.results = [];
        
    },

    check_out_role : // role 欄位不可傳入, 此欄位不可被修改
    function( roleNum )
    {
        if ( roleNum )
            this.appendResult( "jobUpdateRequest-cantModifiedColumnRole" );
    },

    check_out_job : // maxLength：120 
    function( jobName )
    {
        
        if ( jobName === "" ) // 職務名稱不可為空 
        {
            this.appendResult( "job-notEmpty" );
        }

        if ( ( jobName.length < 1 ) || ( jobName.length > 120 ) ) //職務名稱長度必須介於 1 到 120
        {
            this.appendResult( "job-length" ); 
        }
        
    },

    validate : 
    function( inputObject )
    {   
        for ( let field in inputObject )
        {
            let functionName = "check_out_" + field;
            if ( this.hasOwnProperty( functionName ) )
            {
                this[ functionName ]( inputObject[ field ] );
            }
        }
        if( this.results.length !== 0 )
        {
            return this.getErrorResponse();
        }
    },

    getMessages :
    function()
    {
        let messages = "";
        for( let i = 0; i < this.results.length; i++ )
        {
            messages +=  this.results[ i ].message;
        }
        return messages;
    },

    getDetails : 
    function()
    {
        return this.results;
    },

    getErrorResponse : 
    function()
    {
        let errorJson = 
        {
            "error" : {
                "code" : 1,
                "message" : this.getMessages(),
                "details" : this.getDetails()
            }
        };
        this.clear();
        return errorJson;
    },
};