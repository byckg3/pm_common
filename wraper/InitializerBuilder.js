class InitializerBuilder
{
    static parseInitializer( codeString )
    {
        let headerRegExp = /initializer\s*\([\s\w,.]*\)\s*{/;
        let result = headerRegExp.exec( codeString );
        let start = result.index;
        if ( start === -1 )
        {
            throw new Error( "No Initializer");
        }
        
        let header = result[ 0 ].slice( 0, result[ 0 ].length - 1 );

        let begin = start + header.length; // index of "{"
        let body = this.getBoundedContent( codeString, "{", "}", begin );

        return {    
            header,
            body,
            index : result.index,
            lastIndex : start + body.length + 1,  // index of "}"
            content : `${ header }{${ body }}`
        };
    }

    static getBoundedContent( string, leftBorder, rightBorder, start = 0 )
    {
        let stack = [];
        let end = string.length;
        for ( let index = start; index < end; index++ )
        {
            if ( string[ index ] === leftBorder )
            {
                if ( stack.length === 0 )
                {
                    start = index + 1;
                }
                stack.push( string[ index ] );        
            }
            else if ( string[ index ] === rightBorder )
            {
                if ( stack.pop() !== leftBorder )
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
      
        return string.slice( start, end );
    }

    static createNewInitializer( initializer, ...[ key, value ] )
    {   
        let newBodyContent = " ";
        if ( value )
        {
            newBodyContent = this.setInitializerBody( initializer.body, key );
        }
        else if ( key )
        {
            newBodyContent = this.removeInitializerBody(  initializer.body, key );
        }
        
        return `${ initializer.header }{${ newBodyContent }}`; 
    }

    static setInitializerBody( initializerBody, key, value )
    {
        initializerBody = this.removeInitializerBody( initializerBody, key );
       
        let appendantCode = `this.restoreAttribute( "${ key }" );`;
    
        return `${ initializerBody }\n\t\t${ appendantCode } `;
    }

    static removeInitializerBody( initializerBody, key )
    {
        let removalPattern = new RegExp( `\\s*this\\.setAttribute\\(\\s*"${ key }",.*\\);`, "gm" );
        return initializerBody.replace( removalPattern, "" );     
    }

    static buildInitializer( ...parameters )
    {
        let contextCodeString = Utils.getVariable( "TestContext" );
        let initializer = this.parseInitializer( contextCodeString );

        let newContent = this.createNewInitializer( initializer, ...parameters )
        console.log( `new : ${ newContent }`);
        Utils.setGlobalVariable( "TestContext", 
                                 contextCodeString.replace( initializer.content, newContent ) );
    }
}