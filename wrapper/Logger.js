class Logger
{
    static get output()
    {
        if ( !this._output )
        {
            this._output = console;
        }
        return this._output;
    }

    static set output( stream )
    {
        this._output = stream;
    }

    static log()
    {
        return this.output.log();
    }
    
    static error()
    {
        return this.output.error();
    }
}