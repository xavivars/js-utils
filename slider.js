// Archivo JScript

function Slider() 
{
    this.rows = new Array();
}

Slider.prototype.addRow=function(id,name,display,value,type)
{
    var nr = {
        'id':       id,
        'name':     name,
        'display':  display,
        'value':    value,
        'type':     type    
    }
    
    rows.add(nr);
}

// fila del slider


// id,nom,visualitzar,valor,tipus

//new Array ('1000','Element 0',false,'15.7',SliderMathTypePercent); 



