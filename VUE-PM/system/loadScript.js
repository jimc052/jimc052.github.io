let loadScript = function(filename, callback ){
	let arrScript = [];
	if( typeof filename == "string" )
		arrScript.push( filename );
	else
		arrScript = filename;

	function start( index ){
		if( index == arrScript.length ){
			if( callback ) callback();
			return;
		} else if (arrScript[index].indexOf(".css") > 1){ //if filename is an external CSS file
			let element = document.getElementById("css");
			if(element != null) element.parentNode.removeChild(element);

			let link=document.createElement("link");
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("type", "text/css");
			link.setAttribute("href", arrScript[index]);
			link.id    = "css";
			if(typeof link!="undefined")
				document.getElementsByTagName("head")[0].appendChild(fileref)
			start(index+1);
		} else if (arrScript[index].indexOf(".js") > 1){
			let element = document.getElementById("js");
			if(element != null) element.parentNode.removeChild(element);

			let script   = document.createElement("script");
			script.type  = "text/javascript";
			script.src   = arrScript[index]; //filename;
			script.id    = "js";
			if(typeof script != "undefined"){
				script.onload = function(){
					start(index+1);
				};
				document.getElementsByTagName("head")[0].appendChild(script);
			} else
				start(index+1);
		} else
			start(index+1);
	}
	start(0);
};