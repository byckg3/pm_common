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
    // 陣列儲存輸出結果
    results : [],

    // 將物件加入輸出陣列
    appendResult :
    function( errorName )
    {
        this.results.push( { "code" : errorName, "message" : this.ErrorTypes[ errorName ] } );
    },

    // 清除陣列
    clear :
    function()
    {
        this.results = [];
        
    },

    // 檢查role欄位的輸入
    check_out_role : 
    function( roleNum )
    {
        if ( roleNum )  // role 欄位不可傳入, 此欄位不可被修改
            this.appendResult( "jobUpdateRequest-cantModifiedColumnRole" );
    },

    // 檢查job欄位的輸入
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
            return this.createErrorResponse();
        }
    },

    // 輸出message字串訊息
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

    // 輸出details物件陣列
    getDetails : 
    function()
    {
        return this.results;
    },

    // 建構輸出的JSON物件
    createErrorResponse : 
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