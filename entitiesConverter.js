/*  EntitiesConverter class, version 1.0
 *  (c) 2007 Xavier Ivars <xavi@infobenissa.com>
 *
 *  EntitiesConverter is a javascript class able to convert
 *  entities from xml to html and from html to xml
 *
 *  EntitiesConverter is distributed under the GNU General Public License
/*--------------------------------------------------------------------------*/

function EntitiesConverter()
{
    var _entities=new Array(
        new Array('&quot;','&#34;','"'),
        new Array('&amp;','&#38;','&'),
        new Array('&lt ;','&#60;','<'),
        new Array('&gt ;','&#62;','>'),
        new Array('&nbsp;','&#160;',' '),
        new Array('&iexcl;','&#161;','¡'),
        new Array('&cent;','&#162;','¢'),
        new Array('&pound;','&#163;','£'),
        new Array('&curren;','&#164;','¤'),
        new Array('&yen;','&#165;','¥'),
        new Array('&brvbar;','&#166;','¦'),
        new Array('&sect;','&#167;','§'),
        new Array('&uml;','&#168;','¨'),
        new Array('&copy;','&#169;','©'),
        new Array('&ordf;','&#170;','ª'),
        new Array('&laquo;','&#171;','«'),
        new Array('&not;','&#172;','¬'),
        new Array('&shy;','&#173;','­'),
        new Array('&reg;','&#174;','®'),
        new Array('&macr;','&#175;','¯'),
        new Array('&deg;','&#176;','°'),
        new Array('&plusmn;','&#177;','±'),
        new Array('&sup2;','&#178;','²'),
        new Array('&sup3;','&#179;','³'),
        new Array('&acute;','&#180;','´'),
        new Array('&micro;','&#181;','µ'),
        new Array('&para;','&#182;','¶'),
        new Array('&middot;','&#183;','·'),
        new Array('&cedil;','&#184;','¸'),
        new Array('&sup1;','&#185;','¹'),
        new Array('&ordm;','&#186;','º'),
        new Array('&raquo;','&#187;','»'),
        new Array('&frac14;','&#188;','¼'),
        new Array('&frac12;','&#189;','½'),
        new Array('&frac34;','&#190;','¾'),
        new Array('&iquest;','&#191;','¿'),
        new Array('&Agrave;','&#192;','À'),
        new Array('&Aacute;','&#193;','Á'),
        new Array('&Acirc;','&#194;','Â'),
        new Array('&Atilde;','&#195;','Ã'),
        new Array('&Auml;','&#196;','Ä'),
        new Array('&Aring;','&#197;','Å'),
        new Array('&AElig;','&#198;','Æ'),
        new Array('&Ccedil;','&#199;','Ç'),
        new Array('&Egrave;','&#200;','È'),
        new Array('&Eacute;','&#201;','É'),
        new Array('&Ecirc;','&#202;','Ê'),
        new Array('&Euml;','&#203;','Ë'),
        new Array('&Igrave;','&#204;','Ì'),
        new Array('&Iacute;','&#205;','Í'),
        new Array('&Icirc;','&#206;','Î'),
        new Array('&Iuml;','&#207;','Ï'),
        new Array('&ETH;','&#208;','Ð'),
        new Array('&Ntilde;','&#209;','Ñ'),
        new Array('&Ograve;','&#210;','Ò'),
        new Array('&Oacute;','&#211;','Ó'),
        new Array('&Ocirc;','&#212;','Ô'),
        new Array('&Otilde;','&#213;','Õ'),
        new Array('&Ouml;','&#214;','Ö'),
        new Array('&times;','&#215;','×'),
        new Array('&Oslash;','&#216;','Ø'),
        new Array('&Ugrave;','&#217;','Ù'),
        new Array('&Uacute;','&#218;','Ú'),
        new Array('&Ucirc;','&#219;','Û'),
        new Array('&Uuml;','&#220;','Ü'),
        new Array('&Yacute;','&#221;','Ý'),
        new Array('&THORN;','&#222;','Þ'),
        new Array('&szlig;','&#223;','ß'),
        new Array('&agrave;','&#224;','à'),
        new Array('&aacute;','&#225;','á'),
        new Array('&acirc;','&#226;','â'),
        new Array('&atilde;','&#227;','ã'),
        new Array('&auml;','&#228;','ä'),
        new Array('&aring;','&#229;','å'),
        new Array('&aelig;','&#230;','æ'),
        new Array('&ccedil;','&#231;','ç'),
        new Array('&egrave;','&#232;','è'),
        new Array('&eacute;','&#233;','é'),
        new Array('&ecirc;','&#234;','ê'),
        new Array('&euml;','&#235;','ë'),
        new Array('&igrave;','&#236;','ì'),
        new Array('&iacute;','&#237;','í'),
        new Array('&icirc;','&#238;','î'),
        new Array('&iuml;','&#239;','ï'),
        new Array('&eth;','&#240;','ð'),
        new Array('&ntilde;','&#241;','ñ'),
        new Array('&ograve;','&#242;','ò'),
        new Array('&oacute;','&#243;','ó'),
        new Array('&ocirc;','&#244;','ô'),
        new Array('&otilde;','&#245;','õ'),
        new Array('&ouml;','&#246;','ö'),
        new Array('&divide;','&#247;','÷'),
        new Array('&oslash;','&#248;','ø'),
        new Array('&ugrave;','&#249;','ù'),
        new Array('&uacute;','&#250;','ú'),
        new Array('&ucirc;','&#251;','û'),
        new Array('&uuml;','&#252;','ü'),
        new Array('&yacute;','&#253;','ý'),
        new Array('&thorn;','&#254;','þ'),
        new Array('&yuml;','&#255;','ÿ'),
        new Array('&OElig;','&#338;','Œ'),
        new Array('&oelig;','&#339;','œ'),
        new Array('&Scaron;','&#352;','Š'),
        new Array('&scaron;','&#353;','š'),
        new Array('&Yuml;','&#376;','Ÿ'),
        new Array('&fnof;','&#402;','ƒ'),
        new Array('&circ;','&#710;','ˆ'),
        new Array('&tilde;','&#732;','˜'),
        new Array('&Alpha;','&#913;','Α'),
        new Array('&Beta;','&#914;','Β'),
        new Array('&Gamma;','&#915;','Γ'),
        new Array('&Delta;','&#916;','Δ'),
        new Array('&Epsilon;','&#917;','Ε'),
        new Array('&Zeta;','&#918;','Ζ'),
        new Array('&Eta ;','&#919;','Η'),
        new Array('&Theta;','&#920;','Θ'),
        new Array('&Iota;','&#921;','Ι'),
        new Array('&Kappa;','&#922;','Κ'),
        new Array('&Lambda;','&#923;','Λ'),
        new Array('&Mu ;','&#924;','Μ'),
        new Array('&Nu ;','&#925;','Ν'),
        new Array('&Xi ;','&#926;','Ξ'),
        new Array('&Omicron;','&#927;','Ο'),
        new Array('&Pi ;','&#928;','Π'),
        new Array('&Rho ;','&#929;','Ρ'),
        new Array('&Sigma;','&#931;','Σ'),
        new Array('&Tau ;','&#932;','Τ'),
        new Array('&Upsilon;','&#933;','Υ'),
        new Array('&Phi ;','&#934;','Φ'),
        new Array('&Chi ;','&#935;','Χ'),
        new Array('&Psi ;','&#936;','Ψ'),
        new Array('&Omega;','&#937;','Ω'),
        new Array('&alpha;','&#945;','α'),
        new Array('&beta;','&#946;','β'),
        new Array('&gamma;','&#947;','γ'),
        new Array('&delta;','&#948;','δ'),
        new Array('&epsilon;','&#949;','ε'),
        new Array('&zeta;','&#950;','ζ'),
        new Array('&eta ;','&#951;','η'),
        new Array('&theta;','&#952;','θ'),
        new Array('&iota;','&#953;','ι'),
        new Array('&kappa;','&#954;','κ'),
        new Array('&lambda;','&#955;','λ'),
        new Array('&mu ;','&#956;','μ'),
        new Array('&nu ;','&#957;','ν'),
        new Array('&xi ;','&#958;','ξ'),
        new Array('&omicron;','&#959;','ο'),
        new Array('&pi ;','&#960;','π'),
        new Array('&rho ;','&#961;','ρ'),
        new Array('&sigmaf;','&#962;','ς'),
        new Array('&sigma;','&#963;','σ'),
        new Array('&tau ;','&#964;','τ'),
        new Array('&upsilon;','&#965;','υ'),
        new Array('&phi ;','&#966;','φ'),
        new Array('&chi ;','&#967;','χ'),
        new Array('&psi ;','&#968;','ψ'),
        new Array('&omega;','&#969;','ω'),
        new Array('&thetasym;','&#977;','ϑ'),
        new Array('&upsih;','&#978;','ϒ'),
        new Array('&piv ;','&#982;','ϖ'),
        new Array('&ensp;','&#8194;',' '),
        new Array('&emsp;','&#8195;',' '),
        new Array('&thinsp;','&#8201;',' '),
        new Array('&zwnj;','&#8204;','‌'),
        new Array('&zwj;','&#8205;','‍'),
        new Array('&lrm;','&#8206;','‎'),
        new Array('&rlm;','&#8207;','‏'),
        new Array('&ndash;','&#8211;','–'),
        new Array('&mdash;','&#8212;','—'),
        new Array('&lsquo;','&#8216;','‘'),
        new Array('&rsquo;','&#8217;','’'),
        new Array('&sbquo;','&#8218;','‚'),
        new Array('&ldquo;','&#8220;','“'),
        new Array('&rdquo;','&#8221;','”'),
        new Array('&bdquo;','&#8222;','„'),
        new Array('&dagger;','&#8224;','†'),
        new Array('&Dagger;','&#8225;','‡'),
        new Array('&permil;','&#8240;','‰'),
        new Array('&lsaquo;','&#8249;','‹'),
        new Array('&rsaquo;','&#8250;','›'),
        new Array('&bull;','&#8226;','•'),
        new Array('&hellip;','&#8230;','…'),
        new Array('&prime;','&#8242;','′'),
        new Array('&Prime;','&#8243;','″'),
        new Array('&oline;','&#8254;','‾'),
        new Array('&frasl;','&#8260;','⁄'),
        new Array('&euro;','&#8364;','€'),
        new Array('&weierp;','&#8472;','℘'),
        new Array('&image;','&#8465;','ℑ'),
        new Array('&real;','&#8476;','ℜ'),
        new Array('&trade;','&#8482;','™'),
        new Array('&alefsym;','&#8501;','ℵ'),
        new Array('&larr;','&#8592;','←'),
        new Array('&uarr;','&#8593;','↑'),
        new Array('&rarr;','&#8594;','→'),
        new Array('&darr;','&#8595;','↓'),
        new Array('&harr;','&#8596;','↔'),
        new Array('&crarr;','&#8629;','↵'),
        new Array('&lArr;','&#8656;','⇐'),
        new Array('&uArr;','&#8657;','⇑'),
        new Array('&rArr;','&#8658;','⇒'),
        new Array('&dArr;','&#8659;','⇓'),
        new Array('&hArr;','&#8660;','⇔'),
        new Array('&forall;','&#8704;','∀'),
        new Array('&part;','&#8706;','∂'),
        new Array('&exist;','&#8707;','∃'),
        new Array('&empty;','&#8709;','∅'),
        new Array('&nabla;','&#8711;','∇'),
        new Array('&isin;','&#8712;','∈'),
        new Array('&notin;','&#8713;','∉'),
        new Array('&ni ;','&#8715;','∋'),
        new Array('&prod;','&#8719;','∏'),
        new Array('&sum ;','&#8721;','∑'),
        new Array('&minus;','&#8722;','−'),
        new Array('&lowast;','&#8727;','∗'),
        new Array('&radic;','&#8730;','√'),
        new Array('&prop;','&#8733;','∝'),
        new Array('&infin;','&#8734;','∞'),
        new Array('&ang ;','&#8736;','∠'),
        new Array('&and ;','&#8869;','⊥'),
        new Array('&or ;','&#8870;','⊦'),
        new Array('&cap ;','&#8745;','∩'),
        new Array('&cup ;','&#8746;','∪'),
        new Array('&int ;','&#8747;','∫'),
        new Array('&there4;','&#8756;','∴'),
        new Array('&sim ;','&#8764;','∼'),
        new Array('&cong;','&#8773;','≅'),
        new Array('&asymp;','&#8776;','≈'),
        new Array('&ne ;','&#8800;','≠'),
        new Array('&equiv;','&#8801;','≡'),
        new Array('&le ;','&#8804;','≤'),
        new Array('&ge ;','&#8805;','≥'),
        new Array('&sub ;','&#8834;','⊂'),
        new Array('&sup ;','&#8835;','⊃'),
        new Array('&nsub;','&#8836;','⊄'),
        new Array('&sube;','&#8838;','⊆'),
        new Array('&supe;','&#8839;','⊇'),
        new Array('&oplus;','&#8853;','⊕'),
        new Array('&otimes;','&#8855;','⊗'),
        new Array('&perp;','&#8869;','⊥'),
        new Array('&sdot;','&#8901;','⋅'),
        new Array('&lceil;','&#8968;','⌈'),
        new Array('&rceil;','&#8969;','⌉'),
        new Array('&lfloor;','&#8970;','⌊'),
        new Array('&rfloor;','&#8971;','⌋'),
        new Array('&lang;','&#9001;','〈'),
        new Array('&rang;','&#9002;','〉'),
        new Array('&loz ;','&#9674;','◊'),
        new Array('&spades;','&#9824;','♠'),
        new Array('&clubs;','&#9827;','♣'),
        new Array('&hearts;','&#9829;','♥'),
        new Array('&diams;','&#9830;','♦')
    );
    
    this.entities=_entities;
    this.html2xml=_html2xml;
    this.xml2html=_xml2html;
    this.html2entity=_html2entity;
    this.entity2html=_entity2html;
    this.xml2entity=_xml2entity;
    this.entity2xml=_entity2xml;
    
    function _html2xml(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][0],this.entities[i][1]);
        }
        
        return txt;
    }
    
    function _xml2html(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][1],this.entities[i][0]);
        }
        
        return txt;
    }
    
    function _xml2entity(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][1],this.entities[i][2]);
        }
        
        return txt;
    }
    
    function _entity2xml(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][2],this.entities[i][1]);
        }
        
        return txt;
    }
    
    
    function _html2entity(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][0],this.entities[i][2]);
        }
        
        return txt;
    }
    
    function _entity2html(txt)
    {
        for(i=0;i<this.entities.length;i++)
        {
            txt=txt.replace(this.entities[i][2],this.entities[i][0]);
        }
        
        return txt;
    }    
}
