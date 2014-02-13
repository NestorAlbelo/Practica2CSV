$(document).ready(function() {
	$("#resultado").animate({opacity:0}, 0);
   $("button").click(function() {
     csv();
   });
 });


function csv() {
   var commonLength = NaN;
	var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
	var lines = document.getElementById("entrada").value.split(/\n+\s*/);
	var r = [];
	var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";
	
	if (window.localStorage) localStorage.original  = document.getElementById("entrada").value;
	
	for(var t in lines) {
		var m = lines[t].match(regexp);
		var result = [];
    	var error = false;
		if (m) {
			if (commonLength && (commonLength != m.length)) { 	//Se comprueba si la linea actual tiene el mismo tamaño que el tamaño por defecto
        		error = true;
        	}
			else {														  	//Si no se iguala el tamaño por defecto al tamaño de la primera linea, ya que commonLength sera cero
       		commonLength = m.length;
        		error = false;
      	}
      	for(var i in m) {											  	//Limpiamos la cadena de espacios, comillas y comas
        		result.push(m[i].replace(/,\s*$/,'').replace(/^\s*"/,'').replace(/"\s*$/,'').replace(/\\"/,'"'));
      	}
      	var tr = error? '<tr class="error">' : '<tr>';			
      	r.push(tr+_.template(row, {items : result})+"</tr>");	//Introducimos la cadena en el array con una etiqueta de columna	
      }
      else {
      	alert('Por favor revise la linea '+ lines[t] +' de su texto, ya que no se puede evaluar');
      	error = true;
    	}
	}
	r.unshift('<p>\n<table class="center" id="result">');		//Introducimos al principio del array la cadena indicada
  	r.push('</table>');													//Añadimos por la cola del array la cadena indicada
  	resultado.innerHTML = r.join('\n');							//Juntamos en una sola cadena los elementos del array separados por el salto de linea	
  	$("#resultado").animate({opacity:1}, 1000);
}


window.onload = function() {
  // If the browser supports localStorage and we have some stored data
  
  $("#principal").animate({opacity:1}, 1000);
  if (window.localStorage && localStorage.original) {
  		document.getElementById("entrada").value = localStorage.original;
  }
  else{
	  	document.getElementById("entrada").placeholder = ("Ej: Nombre,Apellidos,Edad,Ciudad");
  } 
  	
};