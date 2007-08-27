////////////////////////////////////////////////////
// AJAXLib, Javascript AJAX Library
//
// Author-email: xavi@infobenissa.com
//
// License: LGPL, see LICENSE
////////////////////////////////////////////////////

/**
 * AJAXLib - Javascript AJAX Library
 * @package AJAX
 * @author Xavier Ivars i Ribes
 * @email xavi@infobenissa.com
 */

if(typeof(AJAXLib) == 'undefined')
{
	function AJAXLib(_tipus)
	{
	    this.tipus='ajax';
	    
	    if(typeof _tipus != 'undefined')
	            if(_tipus == "json")
	                this.tipus='json';
	        
	        
	            
	    
	        this.connection=_connection();
		function _connection()
		{
			try { return new XMLHttpRequest(); }
	 		catch (e) { try { return new ActiveXObject('Msxml2.XMLHTTP'); }
	  		catch (e) { try { return new ActiveXObject('Microsoft.XMLHTTP'); }
	  		catch (e) { return false; }}}
	  		return false;
		}
		
		function _get(sFile,oParams,fnDone,txt) {
			return this.request('GET',sFile,oParams,fnDone,txt);
		}
		
		function _post(sFile,oParams,fnDone,txt) {
			return this.request('POST',sFile,oParams,fnDone,txt);
		}
		
		function _request(sMethod,sFileName,oParams,fnDone,txt) {
	            if(this.tipus=='json')
	            {    
	                return this.json(sFileName,oParams,fnDone)
	                
	            }
	            
	            if(typeof (fnDone) != "function")
	                fnDone = eval(fnDone);
			var oRequest = this.connection();
			
			if (!oRequest) 
				return true;
				
			var sParams = '';
			var sFile = sFileName.split('#');
			
			if(sMethod == 'GET') 
			{
				oRequest.open('GET', sFile[0]+this.params(oParams,'?'), true);
			} 
			else 
			{
				sParams = this.params(oParams,'');
				oRequest.open('POST', sFile[0], true);
	        	oRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			}
			
	        oRequest.setRequestHeader('Referer',window.location);
	        oRequest.onreadystatechange = 	function() 
	                {
	                        if (oRequest.readyState == 4 && oRequest.status == 200) 
	                        {
	                                if(fnDone)
	                                {
	                                        if(txt)
	                                                fnDone(oRequest.responseText);
	                                        else
	                                                fnDone(oRequest.responseXML.documentElement);
	                                }
	                                //if(sFile[1])
	                                //	ajax.action(oRequest,sFile[1]);
	                        }
	                };
	        oRequest.send(sParams);
			return false;
		}
		
		function _params(oParams,before) {
			var sParams = '';
			for(i in oParams) {
				if(sParams.length>0) sParams += '&';
				sParams += encodeURIComponent(i)+'='+encodeURIComponent(oParams[i]);
			}
			return before+sParams;
		}
		
	        function _json(sFileName,oParams,fnDone)
	        {
	            aObj = new this.JSONscriptRequest(sFileName);
	            aObj.response=fnDone;
	            aObj.buildParams(oParams);
	            aObj.buildScriptTag();
	            aObj.addScriptTag();
	            return;
	        }

	   
	    function _JSONscriptRequest(fullUrl) {
	        // Keep IE from caching requests
	        this.noCacheIE = '?noCacheIE=' + (new Date()).getTime();
	        // Get the DOM location to put the script tag
	        this.headLoc = document.getElementsByTagName("head").item(0);
	        // Generate a unique script tag id
	        this.scriptId = 'YJscriptId' + _JSONscriptRequest.scriptCounter++;
	        // Function that will be invoqued
	        this.response = 'JSONResponse';
	        
	        // REST request path
	        this.fullUrl = fullUrl;
	    }
	    
	    _JSONscriptRequest.prototype.buildParams = function(oParams) {
	        this.fullUrl+=this.noCacheIE+'&response='+this.response;
	        
	        for(par in oParams)
	        {
	            this.fullUrl += '&' + par + "=" + escape(oParams[par])
	        }
	    }

	    // Static script ID counter
	    _JSONscriptRequest.scriptCounter = 1;

	    _JSONscriptRequest.prototype.buildScriptTag = function () {

	        // Create the script tag
	        this.scriptObj = document.createElement("script");

	        // Add script object attributes
	        this.scriptObj.setAttribute("type", "text/javascript");
	        this.scriptObj.setAttribute("src", this.fullUrl);
	        this.scriptObj.setAttribute("id", this.scriptId);
	    }

	    _JSONscriptRequest.prototype.removeScriptTag = function () {
	        this.headLoc.removeChild(this.scriptObj);  
	    }

	    _JSONscriptRequest.prototype.addScriptTag = function () {
	        this.headLoc.appendChild(this.scriptObj);
	    }


	        
	        this.JSONscriptRequest=_JSONscriptRequest;
		this.get=_get;
		this.request=_request;
		this.connection=_connection;
		this.params=_params;
	        this.post=_post;

	        this.json=_json;
	}
}