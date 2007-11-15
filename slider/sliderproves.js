// Archivo JScript

slid=new Slider('slid');

slid.addRow(1,'Fila 1',true,11.11,false);
slid.addRow(2,'Fila 2',true,22.22,false);
slid.addRow(3,'Fila 3',true,66.67,false);


fixe = new Slider('fixe',Slider.Value);

fixe.addRow(1,'Prova',true,43,false);
fixe.setChangeColor(true);

function sliderInit()
{
	slid.drawSlider('slider',true);
	fixe.drawSlider('fixe',true);
}

addLoadEvent(sliderInit);

