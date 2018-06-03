function before( target, name, descriptor )
{
    if ( target.before === "undifined" )
    {
        target.before = [];
    }
    else
    {
        target.before.push( name );
        console.log( "add before list : " + name  );
    }
}