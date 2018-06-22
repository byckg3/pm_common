class Utils {
    static setGlobalVariable(key, value) {
        pm.globals.set(key, value);
    }

    static getGlobalVariable(key) {
        return pm.globals.get(key);
    }

    static setEnvironmentVariable(key, value) {
        pm.environment.set(key, value);
    }

    static getEnvironmentVariable(key) {
        return pm.environment.get(key);
    }

    static clearEnvironmentVariable(key) {
        pm.environment.unset(key);
    }

    static getVariable(key) {
        return pm.variables.get(key);
    }

    static setVariable(key, value) {
        pm.variables.set(key, value);
    }

    static getValueFromJsonString(jsonString, key) {
        let value;
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

    static getValueObjectFromJsonString(jsonString, ...keys) {
        let vo = {};
        for (let i = 0; i < keys.length; i++) {
            vo[keys[i]] = "";
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

    static propertiesExists(json, ...keys) {
        let jsonString = "";
        let vo = {};

        if (typeof json === "Object") {
            jsonString = JSON.stringify(json);
        }
        for (let i = 0; i < keys.length; i++) {
            vo[keys[i]] = "";
        }

        return true;
    }

    static getQueryStringFromObject() {
        let query_list = []
        for (let i in query_object) {
            // 只將 value 有值的組成 array
            if (query_object[i]) {
                query_list.push(`${i}=${query_object[i]}`);
            }
        }
        // array 有值才會組字串
        return query_list.length > 0 ? `?${query_list.join('&')}` : ''
    }
}
