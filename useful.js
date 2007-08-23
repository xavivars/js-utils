/*  some Javascript useful functions */

if(typeof $ == 'undefined')
{
    function $(id)
    {
        return document.getElementById(id);
    }
}


if(typeof trim == 'undefined')
{
        
    function trim (string) {
            string = string.replace(/^s+/, '');
            for (var i = string.length; i > 0; i--) {
                    if (/S/.test(string.charAt(i))) {
                            string = string.substring(0, i);
                            break;
                    }
            }
            return string;
    }
}