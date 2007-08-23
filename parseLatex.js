/*  ParseLatex class, version 1.0
 *  (c) 2007 Xavier Ivars <xavier.ivars@eltallerdigital.com>
 *
 *  ParseLatex is a Javascript class used by tex2mathml's TinyMCE's plugin
 *  which converts a html image tag with a latex expression on its 'title'
 *  argument to a customized-tag <latex></latex>, in order to make it easy
 *  to store latex expression on database
 *
 *  ParseLatex is distributed under the GNU General Public License
/*--------------------------------------------------------------------------*/

function parseLatex()
{
    this.parse=_parse;
    
    function _parse(text)
    {
        var prev='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>';
        var post="</body></html>";
        var er=new EntitiesConverter();
        text=er.html2xml(text);
        var xmlUtils = new XMLUtils();
        var newElem2=xmlUtils.parseXML(prev+text+post);
        var newElem=newElem2.getElementsByTagName('img');
        var content;
        var str;
        
        for(i=0;i<newElem.length;i++)
        {
            if(newElem[i].getAttribute('id').substring(0,2)=='aa')
            {
                par=newElem[i].parentNode;
                txt=(xmlUtils.xmlDoc()).createElement('latex');
                xmlUtils.setTextContent(txt,newElem[i].getAttribute('title'));
                par.insertBefore(txt,newElem[i]);
                par.removeChild(newElem[i]);
           }
        }
        srz = xmlUtils.XMLSerializer();
        str = srz.serializeToString(newElem2).substring(62);
        content=str.substring(0,str.length-14);
        return content;
    }
    

}
