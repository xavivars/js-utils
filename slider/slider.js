/**
 *
 * Slider basat en la pàgina
 *
 * http://www.eggheadcafe.com/articles/20020922.asp
 *
 */
/*
 *
 * per moure l'assumpte cal fer el següent:
 *
 *
 * el que detecta el moviment es el senyalador
 *
 * coloraines creix a mesura que el senyalador es mou,
 * desplaçant per tant al senyalador cap a la dreta
 *
 * s'hauria de fer un capturador d'event al senyalador
 * per tal de rebre l'event de manera adequada
 *
 *
 *
 */

function Slider(nom){
    this.name = nom;
    this.rows = new Array();
    this.Value = 0;
    this.Percent = 1;
    this.hasSelectedElement = false;
    this.selected = null;
	this.selectedDomElement = null;
	this.selectedIndex = -1;
    this.startX = 0;
    this.currX = 0;
    this.IExplorer = 0;
    this.Mozilla = 1;
    this.Browser = this.Mozilla;
	this.cursorStart=0;
	this.squareStart=0;
	this.writeDescs = false;
	this.imgPath='';

}

Slider.prototype.addRow = function(id, name, display, value, type, locked){
    var nr = {
        'id': id,
        'name': name,
        'display': display,
        'value': value,
        'type': type,
        'locked': locked,
        'savedValue': value
    }

    this.rows.push(nr);
}

Slider.prototype.getRow = function(id){
    var ret = null;

    for (i = 0; i < this.rows.length; i++)
	{
        if (this.rows[i]['id'] == id)
		{
            ret = this.rows[i];
            break;
        }
    }

    return ret;
}

Slider.prototype.lock = function (id)
{
	var	el = $('sliderImage_'+this.name+'_'+id);

	if(typeof el == 'undefined')
		return;

	if(this.isLockedRow(id))
	{
		this.unlockRow(id);
		el.src = this.imgPath+'unlocked.jpg';
	}
	else
	{
		this.lockRow(id);
		el.src = this.imgPath+'locked.jpg';
	}

}

Slider.prototype.unlockRow = function(id){
    (this.getRow(id))['locked'] = false;
}

Slider.prototype.lockRow = function(id){
    (this.getRow(id))['locked'] = true;
}

Slider.prototype.isLockedRow = function(id){
    return (this.getRow(id))['locked'];
}

Slider.prototype.selectElement = function(aEvent){

    var index;

	var myEvent = getEvent(aEvent);

	var srcElem;

	if((typeof myEvent.srcElement) != 'undefined')
		srcElem = myEvent.srcElement;
	else
		srcElem = myEvent.target;

	var sldrContent = srcElem;

    while (sldrContent.id.indexOf("sliderContent_") == -1)
    {
        sldrContent = sldrContent.parentNode;
        if ((sldrContent == null)||(typeof srcElem.id != 'string'))
		{ return }
    }

	sldrIndex = sldrContent.parentNode.id;
	document.sliderActive = document.sliders[sldrIndex];
	sldr = document.sliderActive

	if((typeof sldr == 'undefined'))
		return;


    while (srcElem.id.indexOf("sliderSquare_") == -1)
    {
        srcElem = srcElem.parentNode;
        if ((srcElem == null)||(typeof srcElem.id != 'string'))
		{ return }
    }

	var ef=srcElem;

    if (typeof ef.id != 'undefined') {
        if (ef.id.indexOf("sliderSquare_") != -1) {
            index = ef.id.split("_")[2];
            sldr.hasSelectedElement = true;
			sldr.selectedDomElement = ef;
            sldr.selected = sldr.getRow(index);
			for(i=0;i<sldr.rows.length;i++)
			{
				if(sldr.selected == sldr.rows[i])
				{
					sldr.selectedIndex = i;
					break;
				}

			}

        }
    }

	if(sldr.hasSelectedElement)
	{
		// cursor position
		if(sldr.Browser==sldr.IExplorer)
		{
			sldr.cursorStart=myEvent.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
		}
		else
		{
			sldr.cursorStart=myEvent.clientX+window.scrollX;
		}

		addEvent(document,"mousemove",sldr.moveElement,false);
		addEvent(document,"mouseup",sldr.endElement,false);
	}

    preventEvents(myEvent,sldr.Browser,sldr.IExplorer,sldr.Mozilla);
}


Slider.prototype.moveElement = function(event)
{
	var sldr = document.sliderActive;

	if((typeof sldr == 'undefined') || (sldr.hasSelectedElement == false))
		return;

	var mv;



	var myEvent = getEvent(event);

	if(sldr.Browser == sldr.IExplorer)
	{
		mv=document.documentElement.scrollLeft+document.body.scrollLeft;
	}
	else
	{
		mv=window.scrollX;
	}

	mv+=myEvent.clientX;

	// falta moure la part de baix

	var tomodif=0;
	var numtomodif=0;

	for(i=0;i<sldr.rows.length;i++)
	{
		if((sldr.rows[i]['display']== true)&&((
			sldr.rows[i]['locked']==false) &&
			sldr.selectedIndex != i))
		{
			tomodif+=sldr.rows[i]['value'];
			numtomodif++;
		}
	}

	if(numtomodif==0)
		return;

	var mvd=sldr.moveBar(mv-sldr.cursorStart,tomodif);
	sldr.cursorStart+=mvd;

	if(mvd!=0)
	{
		sldr.moveOtherElements();
		sldr.redraw();
	}

}

Slider.prototype.moveBar = function(px,maxInc)
{
	if(this.selected['locked']|| (!(this.selected['display'])))
		return 0;

	var ret=px;


	var newval = this.selected['value'];
	var oldval = newval;
	var maxval = oldval + maxInc;

	if(newval<0 || newval>100)
		return false;

	newval += this.getWeight(px);

	if((px<0)&&(newval<0))
	{
		ret=this.getWidth(newval)-px;
		ret=-ret;
		newval=0;
	}

	if ((px>0)&&(newval > maxval))
	{
		ret = (newval-maxval) - px;
		ret = -ret;
		newval = maxval;
	}

	this.selected['value']=newval;

	return ret;
}

Slider.prototype.moveOtherElements = function()
{
	var accum = 0;
	var tomodif = new Array();
	var delta = 0;

	for(i=0;i<this.rows.length;i++)
	{
		if((this.rows[i]['display']== true)&&((
			this.rows[i]['locked']==false) &&
			this.selectedIndex != i))
		{
			tomodif.push(i);
			accum += this.rows[i]['value'];
		}
		else
		{
			if((this.rows[i]['display']== true)&&(this.rows[i]['locked']==true))
			{
				delta += this.rows[i]['value'];
			}
		}
	}

	var propi = this.selected['value'];
	var disponible = 100 - delta;
	var toadd = (disponible - (propi+accum));
	toadd=Math.round(toadd*100)/100;
	var suma = (toadd>0);
	var numtomodif=tomodif.length;
	while(Math.abs(toadd)>0)
	{
		if(numtomodif==0)
			break;

		var toaddpart = toadd / numtomodif;

		numtomodif = tomodif.length;

		for(var i=0;i<tomodif.length;i++)
		{
			if(suma)
			{
				if ((this.rows[tomodif[i]]['value']) <= (100 - toaddpart)) {
					this.rows[tomodif[i]]['value'] += toaddpart;
					this.rows[tomodif[i]]['value']=Math.round(this.rows[tomodif[i]]['value']*100)/100;
					toadd-=toaddpart;
				}
				else
					numtomodif--;
			}
			else
			{
				if((this.rows[tomodif[i]]['value'])>=(0-toaddpart)) {
					toadd-=toaddpart;
					this.rows[tomodif[i]]['value']+=toaddpart;
					this.rows[tomodif[i]]['value']=Math.round(this.rows[tomodif[i]]['value']*100)/100;
				}
				else
					numtomodif--;
			}
		}
		toadd=Math.round(toadd*100)/100;
	}
}

Slider.prototype.redraw = function()
{
	for(var i = 0;i<this.rows.length;i++)
	{
		if((this.rows[i]['display']) && (this.rows[i]['locked']==false))
		{
			var nom = "sliderBar_"+this.name+'_'+this.rows[i]['id'];
			var el=$(nom);

			if(typeof el != 'undefined')
			{
				var valor = "sliderValue_"+this.name+'_'+this.rows[i]['id'];
				var vl=$(valor);

				el.style.width = this.getWidth(this.rows[i]['value'])+'px';

				vl.innerHTML = (Math.round(this.rows[i]['value']*10)/10) + '%';

			}

		}

	}
}

Slider.prototype.endElement = function(aEvent)
{
	var sldr = document.sliderActive;

	if((typeof sldr == 'undefined') || (sldr.hasSelectedElement == false))
		return;

	var myEvent = getEvent(aEvent);

	sldr.clean();

	document.sliderActive = null;
}

Slider.prototype.clean = function()
{
	removeEvent(document,"mousemove",this.moveElement,false);
	removeEvent(document,"mouseup",this.endElement,false);

	this.selected=null;
	this.selectedDomElement=null;
	this.hasSelectedElement=false;
}

Slider.prototype.drawSlider = function(plc,descs){

	if(this.rows.length<=0)
		return;

	if(typeof descs == 'boolean')
		this.writeDescs = descs;
	else
		this.writeDescs = false;

    var dst = $(plc);

    if (navigator.userAgent.indexOf("MSIE") >= 0)
        this.Browser = this.IExplorer;

    for (i = 0; i < this.rows.length; i++) {
        var str = '';
		if(this.writeDescs)
		{
			str += '<div class="sliderDescs">'+this.rows[i]['name']+'</div>';
		}
		str += '<div class="sliderContent clearfix" id="sliderContent_' + this.name + '_' + this.rows[i]['id'] + '">';
		str += '<div class="sliderValue" id="sliderValue_'+ this.name + '_' + this.rows[i]['id'] +'" ></div>'
		str += '<div class="sliderImg" id="sliderImageDiv_'+ this.name + '_' + this.rows[i]['id'] +'">'
		str += '<div id="sliderHolder_'+ this.name + '_' + this.rows[i]['id'] +'" class="holder"><span id="edge"></span><span id="container">';
		str += '<img onclick="'+this.name+'.lock(\''+this.rows[i]['id']+'\')" id="sliderImage_' + this.name + '_' + this.rows[i]['id'] + '" src="'+this.imgPath+'unlocked.jpg" />'
		str += '</span></div></div>';
        str += '<div class="sliderBar" id="sliderBar_' + this.name + '_' + this.rows[i]['id'] + '"></div>';
        str += '<div class="sliderSquare" id="sliderSquare_' + this.name + '_' + this.rows[i]['id'] + '">&nbsp;</div></div>';
        dst.innerHTML += str;
    }

	this.setDivSizes();
	this.redraw();

	document.sliders = Array();
	document.sliders[plc]=this;
	addEvent(document,"mousedown",this.selectElement,false);
}

Slider.prototype.save = function()
{
	for(var i=0;i<this.rows.length;i++)
		this.rows[i]['savedValue']=this.rows[i]['value'];
}

Slider.prototype.setDivSizes = function()
{
	if(this.rows.length>0)
	{
		var el=$('sliderContent_'+this.name+'_'+this.rows[0]['id']);

		// square size
		var hg = getStyle(el,'height');
		var wd = getStyle(el,'width');
		var mximw = 0;

		for(var i=0;i<this.rows.length;i++)
		{
			var sqdiv=$('sliderSquare_'+this.name+'_'+this.rows[i]['id']);
			var bardiv=$('sliderBar_'+this.name+'_'+this.rows[i]['id']);
			var imgholder=$('sliderHolder_'+this.name+'_'+this.rows[i]['id']);
			var imgdiv=$('sliderImageDiv_'+this.name+'_'+this.rows[i]['id']);

			setStyle(sqdiv,'height',hg);
			setStyle(bardiv,'height',hg);
			setStyle(imgdiv,'height',hg);
			setStyle(imgholder,'height',hg);
			setStyle(sqdiv,'width',hg);
		}

		var imgdiv=$('sliderImageDiv_'+this.name+'_'+this.rows[0]['id']);
		var vldiv=$('sliderValue_'+this.name+'_'+this.rows[0]['id']);

		mximw += parseInt(getStyle(imgdiv,'padding-right'));
		mximw += parseInt(getStyle(imgdiv,'width'));
		mximw += parseInt(getStyle(vldiv,'width'));



		this.setMaxBarWidth(parseInt(wd)-mximw-parseInt(hg));
	}
}

Slider.prototype.setMaxBarWidth = function (px)
{
	this.maxBarWidth = (px / 100);
}

Slider.prototype.getWidth = function (wg)
{
	return Math.round(wg * this.maxBarWidth);
}

Slider.prototype.getWeight = function (px)
{
	return Math.round((px / this.maxBarWidth)*100)/100;
}

Slider.prototype.setImagePath = function (pt)
{
	this.imgPath = pt;
}
