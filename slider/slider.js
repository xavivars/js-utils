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

Slider.prototype.unlockRow = function(id){
    (this.getRow(id))['locked'] = false;
}

Slider.prototype.lockRow = function(id){
    (this.getRow(id))['locked'] = true;
}

Slider.prototype.isLockedRow = function(id){
    return (this.getRow(id))['locked'];
}

Slider.prototype.getEvent = function(aEvent)
{
	return window.event ? window.event : aEvent;
}

Slider.prototype.selectElement = function(aEvent){

	var sldr = document.sliderActive;

	if((typeof sldr == 'undefined'))
		return;

    var index;

	var myEvent = sldr.getEvent(aEvent);

	var srcElem;

	if((typeof myEvent.srcElement) != 'undefined')
		srcElem = myEvent.srcElement;
	else
		srcElem = myEvent.target;

    while (srcElem.id.indexOf("sliderSquare_") == -1)
    {
        srcElem = srcElem.parentElement;
        if (srcElem == null) { return }
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

    sldr.evitaEventos(myEvent);
	window.status='valors: ';
}


Slider.prototype.evitaEventos = function(event)
{
    if (this.Browser == this.IExplorer) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    else {
        event.preventDefault();
    }
}

Slider.prototype.moveElement = function(event)
{
	var sldr = document.sliderActive;

	if((typeof sldr == 'undefined') || (sldr.hasSelectedElement == false))
		return;

	var mv;



	var myEvent = sldr.getEvent(event);

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
		sldr.moveOtherElements();
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

	newval += (px/3);

	if(newval<0)
	{
		ret=newval-px;
		ret=-ret;
		newval=0;
	}

	if (newval > maxval)
	{
		ret = (newval-maxval) - px;
		ret = -ret;
		newval = maxval;
	}

	this.selected['value']=Math.round(100*newval)/100;

	return ret;
}

Slider.prototype.moveOtherElements = function()
{
	var accum = 0;
	var tomodif = new Array();
	var delta;

	for(i=0;i<this.rows.length;i++)
	{
		if((this.rows[i]['display']== true)&&((
			this.rows[i]['locked']==false) &&
			this.selectedIndex != i))
		{
			tomodif.push(i);
			accum += this.rows[i]['value'];
		}
	}

	if(accum==0)
		return;


	var delta = 100 - accum;
	var propi = this.selected['value'];
	var toadd = (100 - (propi+accum));
	toadd=Math.round(toadd*100)/100;
	var suma = (toadd>0);
	var numtomodif=tomodif.length;
	while(Math.abs(toadd)>0)
	{
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
				if((this.rows[tomodif[i]]['value'])>=toaddpart) {
					toadd-=toaddpart;
					this.rows[tomodif[i]]['value']-=toaddpart;
					this.rows[tomodif[i]]['value']=Math.round(this.rows[tomodif[i]]['value']*100)/100;
				}
				else
					numtomodif--;
			}
		}
		toadd=Math.round(toadd*100)/100;
	}

	this.redraw();
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
				el.style.width = this.rows[i]['value']*3;
		}

	}
}

Slider.prototype.endElement = function(aEvent)
{
	var sldr = document.sliderActive;

	if((typeof sldr == 'undefined') || (sldr.hasSelectedElement == false))
		return;

	var myEvent = sldr.getEvent(aEvent);

	sldr.clean();
}

Slider.prototype.clean = function()
{
	removeEvent(document,"mousemove",this.moveElement,false);
	removeEvent(document,"mouseup",this.endElement,false);

/*	this.selected=null;
	this.selectedDomElement=null;
	this.hasSelectedElement=false; */
}

Slider.prototype.drawSlider = function(plc){
    var dst = $(plc);

    if (navigator.userAgent.indexOf("MSIE") >= 0)
        this.Browser = this.IExplorer;

    for (i = 0; i < this.rows.length; i++) {
        var str = '';
		str += '<div class="sliderContent clearfix" id="sliderContent_' + this.name + '_' + this.rows[i]['id'] + '">';
        str += '<div class="sliderBar" style="width: '+ Math.round(this.rows[i]['value']*3)+'px;" id="sliderBar_' + this.name + '_' + this.rows[i]['id'] + '"></div>';
        str += '<div class="sliderSquare" id="sliderSquare_' + this.name + '_' + this.rows[i]['id'] + '">&nbsp;</div></div>';
        dst.innerHTML += str;
    }

	document.sliderActive = this;
	addEvent(document,"mousedown",this.selectElement,false);
}
