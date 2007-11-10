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

function Slider(nom)
{
	this.name=nom;
    this.rows = new Array();
    this.Value=0;
    this.Percent=1;
	this.hasSelectedElement=false;
	this.selected=null;

	document.onmousedown=this.moveElement();
	document.onmousemove;
	document.onmouseup;
	document.onselects
}

Slider.prototype.addRow=function(id,name,display,value,type,locked)
{
    var nr = {
        'id':       id,
        'name':     name,
        'display':  display,
        'value':    value,
        'type':     type,
        'locked':   locked,
        'savedValue': value
    }

    this.rows.push(nr);
}

Slider.prototype.getRow=function(id)
{
    var ret=null;

    for(i=0;i<this.rows.length;i++)
    {
        if(this.rows[i]['id']==id)
        {
            ret=this.rows[i];
            break;
        }
    }

    return ret;
}

Slider.prototype.unlockRow=function(id)
{
    (this.getRow(id))['locked']=false;
}

Slider.prototype.lockRow=function(id)
{
    (this.getRow(id))['locked']=true;
}

Slider.prototype.isLockedRow=function(id)
{
    return (this.getRow(id))['locked'];
}

Slider.prototype.moveElement=function()
{
	if(!this.hasSelectedElement) return;
}

Slider.prototype.selectElement = function (ef)
{
	var index;

	if(typeof ef.id != 'undefined')
	{
		if(ef.id.indexOf("sliderSquare_")!=-1)
		{
			index=ef.id.split("sliderSquare_")[1];
			this.hasSelectedElement=true;
			this.selected=this.getRow(index);
		}
	}
}

Slider.prototype.drawSlider = function (plc)
{
	var dst=$(plc);

	for(i=0;i<this.rows.length;i++)
	{
		var str = '<div class="sliderContent clearfix" id="sliderContent_'+this.rows[i]['id']+'">';
		str += '<div class="sliderBar" id="sliderBar_'+this.rows[i]['id']+'">&nbsp;</div>';
		str += '<div onmousedown="'+this.name+'.selectElement(this)" class="sliderSquare" id="sliderSquare_'+this.rows[i]['id']+'">&nbsp;</div></div>';
		dst.innerHTML+=str;
	}
}
