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

	/**
	*  Javascript trim, ltrim, rtrim
	*  http://www.webtoolkit.info/
	**/

	function trim(str, chars) {
		return ltrim(rtrim(str, chars), chars);
	}

	function ltrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}

	function rtrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
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

if (typeof sprintf == 'undefined')
{

	/**
	*  Javascript sprintf
	*  http://www.webtoolkit.info/
	**/

	sprintfWrapper = {

		init : function () {

			if (typeof arguments == "undefined") { return null; }
			if (arguments.length < 1) { return null; }
			if (typeof arguments[0] != "string") { return null; }
			if (typeof RegExp == "undefined") { return null; }

			var string = arguments[0];
			var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
			var matches = new Array();
			var strings = new Array();
			var convCount = 0;
			var stringPosStart = 0;
			var stringPosEnd = 0;
			var matchPosEnd = 0;
			var newString = '';
			var match = null;

			while (match = exp.exec(string)) {
				if (match[9]) { convCount += 1; }

				stringPosStart = matchPosEnd;
				stringPosEnd = exp.lastIndex - match[0].length;
				strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

				matchPosEnd = exp.lastIndex;
				matches[matches.length] = {
					match: match[0],
					left: match[3] ? true : false,
					sign: match[4] || '',
					pad: match[5] || ' ',
					min: match[6] || 0,
					precision: match[8],
					code: match[9] || '%',
					negative: parseInt(arguments[convCount]) < 0 ? true : false,
					argument: String(arguments[convCount])
				};
			}
			strings[strings.length] = string.substring(matchPosEnd);

			if (matches.length == 0) { return string; }
			if ((arguments.length - 1) < convCount) { return null; }

			var code = null;
			var match = null;
			var i = null;

			for (i=0; i<matches.length; i++) {

				if (matches[i].code == '%') { substitution = '%' }
				else if (matches[i].code == 'b') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'c') {
					matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'd') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'f') {
					matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'o') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 's') {
					matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
					substitution = sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'x') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
					substitution = sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'X') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
					substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
				}
				else {
					substitution = matches[i].match;
				}

				newString += strings[i];
				newString += substitution;

			}
			newString += strings[i];

			return newString;

		},

		convert : function(match, nosign){
			if (nosign) {
				match.sign = '';
			} else {
				match.sign = match.negative ? '-' : match.sign;
			}
			var l = match.min - match.argument.length + 1 - match.sign.length;
			var pad = new Array(l < 0 ? 0 : l).join(match.pad);
			if (!match.left) {
				if (match.pad == "0" || nosign) {
					return match.sign + pad + match.argument;
				} else {
					return pad + match.sign + match.argument;
				}
			} else {
				if (match.pad == "0" || nosign) {
					return match.sign + match.argument + pad.replace(/0/g, ' ');
				} else {
					return match.sign + match.argument + pad;
				}
			}
		}
	}

	sprintf = sprintfWrapper.init;

}

if(typeof noEvents == 'undefined')
{
	function preventEvents(event,br,iex,mz)
	{
	    if (br == iex) {
	        window.event.cancelBubble = true;
	        window.event.returnValue = false;
    	}
	    else
		{
	        event.preventDefault();
    	}
	}
}

if(typeof getEvent == 'undefined')
{
	function getEvent(aEvent)
	{
		return window.event ? window.event : aEvent;
	}
}
