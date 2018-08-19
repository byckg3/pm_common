class Utils 
{
    static import( libName )
    {
        return eval( "(" + pm.variables.get( libName ) + ")" );
    }

    static getGlobalVariable(key) {
        return pm.globals.get(key);
    }

    static getEnvironmentVariable(key) {
        return pm.environment.get(key);
    }

    static getVariable( key ) {
        return pm.variables.get( key );
    }

    static setGlobalVariable( key, value ) {
        pm.globals.set( key, value );
    }

    static setEnvironmentVariable( key, value ) {
        pm.environment.set( key, value );
    }
    
    static setVariable( key, value ) 
    {
        pm.variables.set( key, value );
    }

    static removeGlobalVariable(key) {
        pm.globals.unset(key);
    }

    static removeEnvironmentVariable(key) {
        pm.environment.unset(key);
    }

    static removeVariable( key ) 
    {
        if ( pm.variables.has( key ) )
        {
            pm.variables.unset(key);
        }
        else if ( this.hasEnvironmentVariable( key ) )
        {
            this.removeEnvironmentVariable( key )
        }
        else if ( this.hasGlobalVariable( key ) )
        {
            this.removeGlobalVariable( key );
        }
    }

    static hasGlobalVariable( key )
    {
        return pm.globals.has( key );
    }

    static hasEnvironmentVariable( key )
    {
        return pm.environment.has( key );
    }

    static hasVariable( key )
    {
        if ( pm.variables.has( key ) )
        {
            return true;
        }
        if ( this.hasEnvironmentVariable( key ) )
        {
            return true;
        }
        if ( this.hasGlobalVariable( key ) )
        {
            return true;
        }
        return false;
    }

    static getBoundedString( string, leftBorder, rightBorder, start = 0 )
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
    // 不支援有重複相同屬性名稱的JSON
    static getValueFromJsonString(jsonString, key) {
        let value = null;
        JSON.parse(jsonString,
            (property, data) => {
                if (property === key) {
                    value = data;
                }
                return data;
            }
        );
        return value;
    }
    // 不支援有重複相同屬性名稱的JSON
    static getValueObjectFromJsonString(jsonString, ...keys) {
        let vo = {};
        for (let i = 0; i < keys.length; i++) {
            vo[keys[i]] = null;
        }

        JSON.parse(jsonString,
            (property, data) => {
                if (vo.hasOwnProperty(property)) {
                    vo[property] = data;
                }
                return data;
            }
        );
        return vo;
    }

    static getQueryStringFromObject(query_object) {
        let query_list = [];
        for (let i in query_object) {
            // 只將 value 有值的組成 array
            if (query_object[i]) {
                query_list.push(`${i}=${query_object[i]}`);
            }
        }
        // array 有值才會組字串
        return query_list.length > 0 ? `?${query_list.join('&')}` : '';
    }
    // deprecated
    static setObjectEnvironmentVariable(key, value) {
        this.setEnvironmentVariable(key, JSON.stringify(value));
    }
    // deprecated
    static getObjectEnvironmentVariable(key) {
        return JSON.parse(this.getEnvironmentVariable(key));
    }

    // deprecated
    static testCurRequestBodyWithObject(CurRequestBdoy, post_request_json_body) {
        for (let i in post_request_json_body) {
            Tests[`Test ${i}`] = JSON.stringify(post_request_json_body[i]) === JSON.stringify(CurRequestBdoy[i]);
        }
    }
}
