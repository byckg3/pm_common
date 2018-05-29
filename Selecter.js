Selecter = 
{
    selectHttpStatus( context ) 
    {
        let statusText = context.statusText.replace( / /g, "_" ).toLowerCase();
        let expectedCode = context.expectedCode;

        return "expect_" + statusText + "_" + expectedCode;
    }
}