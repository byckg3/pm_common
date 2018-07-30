class AccessController
{
    constructor()
    {
        this.accessController = { 
            get( target, key )
            {
                if ( key.startsWith( "_" ) )
                {
                    throw new Error( `Property ${ key } is inaccessible.` );
                }
                return Reflect.get( target, key );
            },

            set( target, key, value )
            {
                if ( key.startsWith( "_" ) )
                {
                    throw new Error( `Property ${ key } is inaccessible.` );
                }
                return Reflect.set( target, key, value );
            },

            has()
            {
                if ( key.startsWith( "_" ) )
                {
                    return false;
                }
                return Reflect.has( target, key );
            },

            deleteProperty( target, key )
            {

                return Reflect.deleteProperty( target, key );
            },

            defineProperty( target, key, descriptor )
            {
                if ( key.startsWith( "_" ) )
                {
                    return false;
                }
                return Reflect.defineProperty( target, key, descriptor );
            },

            ownKeys( target )
            {
                let keys = Reflect.ownKeys( target );
                
                return keys.filter(
                    ( key ) => {
                        const isStringKey = typeof key === "string";
                        if ( isStringKey )
                        {
                            return !key.startsWith( "_" );
                        }
                        return true;
                    }
                );
            },
            
            getOwnPropertyDescriptor( target, key )
            {
                if ( key.startsWith( "_" ) )
                {
                    return undefined;
                }
                return Reflect.getOwnPropertyDescriptor( target, key );
            },

           
        };
    }
}