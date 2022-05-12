var palabras = ['python', 'javascript', 'java', 'php', 'swift'];
var palabra = palabras[Math.floor(Math.random()*palabras.length)];

var hombre, l, espacio;

var Ahorcado = function (con){
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();
}

Ahorcado.prototype.dibujar = function (){
	var dibujo = this.contexto;

	dibujo.beginPath();
	dibujo.moveTo(150,100);
	dibujo.lineTo(150,50);
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.lineWidth = 6;
	dibujo.strokeStyle = "black";
	dibujo.stroke();
	dibujo.closePath();

	if(this.intentos > 0){
		//rostro
		document.getElementById("aviso").innerHTML = "Te quedan 4 intentos";
		dibujo.beginPath();
		dibujo.arc(150,140, 40, 0, Math.PI * 2, false);
		dibujo.strokeStyle = "black";
		dibujo.lineWidth = 5;
		dibujo.stroke();
		dibujo.closePath();

		if(this.intentos > 1){
			//torzo
			document.getElementById("aviso").innerHTML = "Te quedan 3 intentos";
			dibujo.beginPath();
			dibujo.moveTo(150, 180);
			dibujo.lineTo(150, 250);
			dibujo.strokeStyle = "black";
			dibujo.lineWidth = 5;
			dibujo.stroke();
			dibujo.closePath();

			if(this.intentos > 2){
				//brazos
				document.getElementById("aviso").innerHTML = "Te quedan 2 intentos";
				dibujo.beginPath();
				dibujo.moveTo(120, 220);
				dibujo.lineTo(150, 180);
				dibujo.lineTo(180, 220);
				dibujo.strokeStyle = "black";
				dibujo.lineWidth = 5;
				dibujo.stroke();
				dibujo.closePath();

				if(this.intentos > 3){
					//piernas
					document.getElementById("aviso").innerHTML = "Te quedan 1 intento";
					dibujo.beginPath();
					dibujo.moveTo(120, 290);
					dibujo.lineTo(150, 250);
					dibujo.lineTo(180, 290);
					dibujo.strokeStyle = "black";
					dibujo.lineWidth = 5;
					dibujo.stroke();
					dibujo.closePath();

					if(this.intentos > 4){
						document.getElementById("aviso").innerHTML = "Juego Finalizado.";

						dibujo.beginPath();
						//ojo izq
						dibujo.moveTo(125,120);
						dibujo.lineTo(145,145);
						dibujo.moveTo(145,120);
						dibujo.lineTo(125,145);

						//ojo der
						dibujo.moveTo(155,120);
						dibujo.lineTo(175,145);
						dibujo.moveTo(175,120);
						dibujo.lineTo(155,145);

						dibujo.strokeStyle = "red";
						dibujo.lineWidth = 5;
						dibujo.stroke();
						dibujo.closePath();

					}

				}
			}
		}
	}
}

Ahorcado.prototype.trazar = function (){
	this.intentos++;
	if(this.intentos >= this.maximo){
		this.vivo = false;
		alert("Game Over")
	}

	this.dibujar();
}

function inicio (){
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var canvas = document.getElementById("c");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d");
	hombre = new Ahorcado(contexto);
	
	palabra = palabra.toUpperCase(); //pasar a mayuscula	
	espacio = new Array(palabra.length); 
	b.addEventListener("click", agregarLetra);
	mostrarPista(espacio);
	if (palabra == 'PYTHON') {
		document.getElementById("texto").innerHTML = "Descripcion: admite programación estructural, orientada a objetos y funcional. Su filosofía de diseño se enfatiza en la legibilidad del código.";
	} else if (palabra == 'JAVASCRIPT') {
		document.getElementById("texto").innerHTML = "Descripcion: es una de las tecnologías centrales de la World Wide Web, junto con HTML y CSS. Más del 97% de los sitios web lo usan en el lado del cliente para el comportamiento de la página web.";
	} else if (palabra == 'JAVA') {
		document.getElementById("texto").innerHTML = "Descripcion: está basado en clases y orientado a objetos; y está diseñado para tener la menor cantidad posible de dependencias de implementación";

	} else if (palabra == 'PHP') {
		document.getElementById("texto").innerHTML = "Descripcion: lenguaje de uso general que se adapta especialmente al desarrollo web. Su código generalmente se procesa en un servidor web.";
	} else if (palabra == 'SWIFT') {
		document.getElementById("texto").innerHTML = "Descripcion: es un lenguaje de programación multiparadigma creado por Apple enfocado en el desarrollo de aplicaciones para iOS y macOS.";
	} else {
		document.getElementById("texto").innerHTML = "Ha ocurrido un error"
	}
}

function agregarLetra(){
	var letra = l.value;
	l.value = "";
	mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra, ahorcado, letra){
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	for(p in palabra){
		if(letra == palabra[p]){
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	if(!encontrado){
		ahorcado.trazar();
	}

	if(!ahorcado.vivo){	
	}
}

function mostrarPista(espacio){
	var pista = document.getElementById("pista")
	var texto ="";
	var i;
	var largo = espacio.length;

	for(i= 0; i<largo; i++)
	{
		if(espacio[i] != undefined)
		{
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}
	}
	pista.innerText = texto;
}