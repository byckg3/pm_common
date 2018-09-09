class MethodAnalyzer
{
    static get _testMethodPrefixes()
    {
        return [ "test", "expect", "check", "verify", "validate" ];
    }

    static get _selectorPrefixes()
    {
        return [ "select", "choose" ];
    }

    static get _conditionalTestKeywords()
    {
        return [ "if", "when" ];
    }

    static get _excludeKeywords()
    {
        return [ "select", "choose" ];
    }

    static isTestableMethod( methodName )
    {
        return  this._startsWithPrefix( methodName, this._testMethodPrefixes );
    }
    
    static isSelector( methodName )
    {
        return this._startsWithPrefix( methodName, this._selectorPrefixes );
    }

    static isConditional( methodName )
    {
        for ( let keyword of this._conditionalTestKeywords )
        {
            if ( this._includesKeyword( methodName, keyword ) )
            {
                return true;
            }
        }
        return false;
    }
 
    static getCondition( methodName )
    {
        let condition = "common";
        
        for ( let keyword of this._conditionalTestKeywords )
        {
            if ( this._includesKeyword( methodName, keyword ) )
            {
                const index = methodName.toLowerCase().indexOf( keyword ) + keyword.length + 1;
                return methodName.slice( index );
            }
        }
        return condition;
    }

    static _includesKeyword( methodName, keyword )
    {
        return methodName.toLowerCase().indexOf( keyword ) !== -1
    }

    static _startsWithPrefix( methodName, prefixes )
    {
        for ( let prefix of prefixes )
        {
            if ( methodName.startsWith( prefix ) )
            {
                return true;
            }
        }
        return false;
    }

   
}