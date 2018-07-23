class Utils 
{
    static getGlobalVariable(key) {
        return pm.globals.get(key);
    }

    static getGlobalObject( key ) {
        return JSON.parse( this.getGlobalVariable( key ) );
    }

    static getEnvironmentVariable(key) {
        return pm.environment.get(key);
    }

    static getEnvironmentObject( key ) {
        return JSON.parse( this.getEnvironmentVariable( key ) );
    }

    static getVariable(key) {
        return pm.variables.get(key);
    }

    static getObject( key ) {
        return JSON.parse( this.getVariable( key ) );
    }

    static setGlobalVariable( key, value ) {
        value = this.convertToObject( value );
        pm.globals.set( key, value );
    }

    static setEnvironmentVariable( key, value ) {
        value = this.convertToObject( value );
        pm.environment.set( key, value );
    }
    
    static setVariable( key, value ) {
        value = this.convertToObject( value );
        pm.variables.set( key, value );
    }

    static removeGlobalVariable(key) {
        pm.globals.unset(key);
    }

    static removeEnvironmentVariable(key) {
        pm.environment.unset(key);
    }

    static hasGlobalVariable( key )
    {
        return pm.globals.has( key );
    }

    static hasEnvironmentVariable( key )
    {
        return pm.environment.has( key );
    }

    static convertToObject( value )
    {
        if ( typeof value === "object" && !Array.isArray( value ) )
        {
            return JSON.stringify( value );
        }
        return value;
    }

    // deprecated
    static setObjectEnvironmentVariable(key, value) {
        this.setEnvironmentVariable(key, JSON.stringify(value));
    }
    // deprecated
    static getObjectEnvironmentVariable(key) {
        return JSON.parse(this.getEnvironmentVariable(key));
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

    static testCurRequestBodyWithObject(CurRequestBdoy, post_request_json_body) {
        for (let i in post_request_json_body) {
            Tests[`Test ${i}`] = JSON.stringify(post_request_json_body[i]) === JSON.stringify(CurRequestBdoy[i]);
        }
    }
}
