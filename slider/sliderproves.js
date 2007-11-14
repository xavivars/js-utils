// Archivo JScript

slid=new Slider('slid');

slid.addRow(1,'Fila 1',true,11.11,Slider.percent,false);
slid.addRow(2,'Fila 2',true,22.22,Slider.percent,false);
slid.addRow(3,'Fila 3',true,66.67,Slider.percent,false);


function sliderInit()
{
	slid.drawSlider('slider',true);
}

addLoadEvent(sliderInit);

