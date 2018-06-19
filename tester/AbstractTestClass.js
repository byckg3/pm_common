class AbstractTestClass // abstract class
{ 
    constructor()
    {
        
    }

    setUp()
    {
        console.log( "setup : " );   
    }

    run( testResult ) // abstract method
    {   
        throw new Error( "You have to implement the run() method" );
    }

    unexpected()
    {
        console.log( "unexpected : " );
    }

    tearDown()
    {
        console.log( "tear down : " ); 
    }
}