class ContextBuilder
{
    static getInitializerContent( codeString )
    {
        let regExp = /initialize\s*\([\s\w,.]*\)\s*{$/;
        let result = regExp.exec( codeString );
        let start = result.index;
 
        if ( start === -1 )
        {
            return;
        }
        start += "initialize()".length;
        
        return this.getBoundedContent( codeString, "{", "}", start );
    }

    static getBoundedContent( string, leftBound, rightBound, start = 0 )
    {
        let stack = [];
        let end = string.length;
        for ( let index = start; index < end; index++ )
        {
            if ( codeString[ index ] === leftBound )
            {
                if ( stack.length === 0 )
                {
                    start = index + 1;
                }
                stack.push( codeString[ index ] );        
            }
            else if ( codeString[ index ] === rightBound )
            {
                if ( stack.pop() !== leftBound )
                {
                    console.log( "SyntaxError");
                    return;
                }
    
                if ( stack.length === 0 )
                {
                    end = index;
                    break;
                }
            }
        }
        return codeString.slice( start, end );
    }    
}