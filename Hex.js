if (typeof Hex == 'undefined')
{
	Hex = function (){
		var values = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");

		function toHex(nm)
		{
		    var hexaDec = Math.floor(nm/16);

		    var hexaUni = nm - (hexaDec * 16);

			return values[hexaDec] + values[hexaUni];
		}

		function toDecimal(nm)
		{
			return parseInt(''+nm,16);
		}

		return {
			toHex : toHex,
			toDecimal: toDecimal
		}
	}();
}