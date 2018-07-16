class InitializerBuilder
{
    static getInitializerContent( codeString )
    {
        let regExp = /initializer\s*\([\s\w,.]*\)\s*{/;
        let result = regExp.exec( codeString );
        let start = result.index;
        console.log( `start : ${ start }` );    
        if ( start === -1 )
        {
            throw new Error( "No Initializer");
        }
        start += "initialize()".length;
        console.log( `start : ${ start }` );
        return [ result[ 0 ], this.getBoundedContent( codeString, "{", "}", start ) ];
    }

    static getBoundedContent( string, leftBound, rightBound, start = 0 )
    {
        let stack = [];
        let end = string.length;
        for ( let index = start; index < end; index++ )
        {
            if ( string[ index ] === leftBound )
            {
                if ( stack.length === 0 )
                {
                    start = index + 1;
                }
                stack.push( string[ index ] );        
            }
            else if ( string[ index ] === rightBound )
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
        console.log( `getBoundedContent : ${string.slice( start, end )}` );
        return string.slice( start, end );
    }

    static getInitializerNewContent( initializerContent, operation )
    {

    }

    static addCode()
    {
        let contextCodeString = Utils.getVariable( "TestContext" );
        let initializerContent = this.getInitializerContent( contextCodeString );

        let appendantCode = `this.setAttribute( "${ key }", "${ value }" );`;
        
        Utils.setGlobalVariable( "TestContext", 
                                 contextCodeString.replace( new RegExp( `initializer\\s*\\([\\s\\w,.]*\\)\\s*{${ initializerContent }}` ), 
                                                            `initializer() {${ initializerContent }\n\t\t${ appendantCode } }` ) );
    }

    static getAppendantPattern( key, value )
    {
        return `this.setAttribute( "${ key }", "${ value }" );`;
    }
}