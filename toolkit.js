/*  some Javascript useful functions */

if(typeof $ == 'undefined')
{
    function $(id)
    {
        return document.getElementById(id);
    }
}

if (typeof countWords == 'undefined') {

	function countWords(str){
		var r = 0;
		var a = str.replace(/\s/g, ' ');
		a = a.split(' ');

		for (z = 0; z < a.length; z++) {
			if (a[z].length > 0)
				r++;
		}

		return r;
	}
}

if(typeof addEvent == 'undefined')
{
    function addEvent(obj, evType, fn, useCapture)
	{
        if (obj.addEventListener)
		{
            obj.addEventListener(evType, fn, useCapture);
            return true;
        }
        else
		{
            if (obj.attachEvent)
			{
                var r = obj.attachEvent("on" + evType, fn);
                return r;
            }
            else {
                alert("Handler could not be attached");
            }
		}
    }

    function removeEvent(obj, evType, fn, useCapture)
	{
        if (obj.removeEventListener)
		{
            obj.removeEventListener(evType, fn, useCapture);
            return true;
        }
        else
		{
            if (obj.detachEvent)
			{
                var r = obj.detachEvent("on" + evType, fn);
                return r;
            }
            else
			{
                alert("Handler could not be removed");
            }

		}
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


if (typeof addLoadEvent == 'undefined')
{
    function addLoadEvent(func)
	{
        var oldonload = window.onload;
        if (typeof window.onload != 'function')
		{
            window.onload = func;
        }
        else
		{
            window.onload = function()
			{
                if (oldonload)
				{
                    oldonload();
                }
                func();
            }
        }
    }
}


if (typeof getStyle == 'undefined')
{
    function getStyle(x, styleProp)
	{
        if (window.getComputedStyle) //Netscape
            var y = window.getComputedStyle(x, null).getPropertyValue(styleProp);
        else
            if (x.currentStyle) //IE
                var y = eval('x.currentStyle.' + styleProp);

        return y;
    }

}

if (typeof setStyle == 'undefined')
{
    function setStyle(x, styleProp,value)
	{
        x.style[styleProp] = value;
    }
}




