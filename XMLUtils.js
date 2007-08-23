/*  XMLUtils class, version 1.0
 *  (c) 2007 Xavier Ivars <xavier.ivars@eltallerdigital.com>
 *
 *  XMLUtils is a cross-browser Javascript class that implements
 *  XML-related functions, as serializing, parsing, etc.
 *
 *  ParseLatex is distributed under the GNU General Public License
/*--------------------------------------------------------------------------*/

function XMLUtils()
{
    function _XMLSerializer()
    {
        if(window.XMLSerializer)
            return new window.XMLSerializer();
        else
        {
            serialxml = function() {};
            serialxml.prototype.serializeToString = function(oNode) {
                return oNode.xml;
            };
            return new serialxml();
        }
    }

    function _parseXML(text) {
            var doc;
            if (typeof DOMParser != undefined) {
                    var parser = new DOMParser();
                    doc = parser.parseFromString(text, "text/xml");
            }
            else if (typeof ActiveXObject != undefined) {
                    doc=new ActiveXObject("Microsoft.XMLDOM");
                    doc.async="false";
                    doc.loadXML(text);
            }
            return doc;
    }
    
    function _xmlDoc(dname)
    {
        var xmlDoc;

        if (window.ActiveXObject)
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        }
        else if (document.implementation && document.implementation.createDocument)
        {
            xmlDoc=document.implementation.createDocument("","",null);
        }
        else
        {
            alert('Your browser cannot handle this script');
        }
        
        xmlDoc.async=false;
        
        if(dname != undefined)
            xmlDoc.load(dname);
        return(xmlDoc);
    }
    
    function _setTextContent(node,text)
    {
        if(node.textContent != undefined){
             node.textContent = text;    
        } else{
             node.text = text;
        }
    }
    
    this.setTextContent = _setTextContent;
    this.parseXML = _parseXML;
    this.xmlDoc = _xmlDoc;
    this.XMLSerializer = _XMLSerializer;
}