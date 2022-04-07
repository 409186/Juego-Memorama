let ctx, canvas;
let primerCarta = true;
let cartaPrimera, cartaSegunda;
let colorDelante = "blue";
let colorAtras = "blue";
let colorCanvas = "blue";
let inicioX = 250;
let inicioY = 40;
let cartaMargen = 1;
let cartaLon = 30;
let cartaAncho = 85; //100;
let cartaLargo = 120; //140;
let cartas_array = new Array();
let iguales = false;
let cartas = 0;
let bandera = true;
let pares = [ 
	["Charizard.jpg","Charizard.jpg"],
	["blastoise.jpg","blastoise.jpg"],
	["electivire.jpg","electivire.jpg"],
	["Greninja.jpg","Greninja.jpg"],
	["Groudon.jpg","Groudon.jpg"],
	["pikachu.jpg","pikachu.jpg"],
	["Snorlax.jpeg","Snorlax.jpeg"],
    ["Torterra.jpg","Torterra.jpg"],
	["Golem.jpg","Golem.jpg"],
	["Machamp.jpg","Machamp.jpg"]
];
/***** OBJETOS ******/
let gameOver1_txt = new Texto(110,200, "¡Felicidades, has ganado!", "white", "bold 60px Comic",false);
let gameOver2_txt = new Texto(110,100, "Juego terminado", "white", "bold 60px Comic",false);
let gameOver3_txt = new Texto(135,200, "vuélvelo a intentar.", "white", "bold 60px Comic",false);
let gameOver4_txt = new Texto(415,295, "Jugar de nuevo", "white", "bold 20px Comic",false);
let gameOver1_rec = new Rectangulo(100,120,740,120,30, colorAtras, "black");
let gameOver2_rec = new Rectangulo(100,20,750,220,30, colorAtras, "black");
let final_btn = new Elemento(380,260, 200, 60);
//
//Pantalla de inicio
//
let inicio_txt = new Texto(425,245, "Iniciar juego", "white", "bold 20px Comic",false);
let inicio_btn = new Elemento(380,210, 200, 60);
let caratula;
//
//Reloj
//
let reloj = new Reloj(2,480, "white", 710,40,20,480, 30*2);
/***** FUNCIONES ****/
function dibujaCarta(){
	ctx.fillStyle = colorAtras;
	ctx.fillRect(this.x, this.y, this.ancho, this.largo);	
}
function tablero(){
	let i;
	let carta;
	let x = inicioX;
	let y = inicioY;
	let renglon = 0, columna = 0;
	let numColumnas = 5;
	let alto;
	cartas_array = [];
	for(i=0; i<pares.length; i++){
		//
		//Alto de la carta
		//
		alto = (cartaLargo+cartaMargen)*renglon;
		//
		img = "imagenes/"+pares[i][0];
		carta = new Carta(x, y+alto, cartaAncho, cartaLargo, img, i);
		cartas_array.push(carta);
		carta.dibuja();
		//
		//Creamos la segunda carta
		//
		alto = (cartaLargo+cartaMargen)*(renglon+1);
		//
		img = "imagenes/"+pares[i][1];
		carta = new Carta(x, y+alto, cartaAncho, cartaLargo, img, i);
		cartas_array.push(carta);
		carta.dibuja();
		//Aumentamos el valos de x
		x += cartaAncho + cartaMargen;
		columna++;
		if(columna==numColumnas){
			columna = 0;
			renglon +=2;
			x = inicioX;
		}
	}
}
function barajea(){
	let i, j, k;
	let temporalInfo, temporalImg;
	let lon = cartas_array.length;
	for(j=0; j<lon*3; j++){
		i = Math.floor(Math.random()*lon);
		k = Math.floor(Math.random()*lon);	
		//
		temporalInfo = cartas_array[i].info;
		temporalImg = cartas_array[i].img;
		//
		cartas_array[i].info = cartas_array[k].info;
		cartas_array[i].img = cartas_array[k].img;
		//
		cartas_array[k].info = temporalInfo;
		cartas_array[k].img = temporalImg;
	}
}
function ajusta(xx, yy){
	let posCanvas = canvas.getBoundingClientRect();
	let x = xx - posCanvas.left;
	let y = yy - posCanvas.top;
	return {x:x, y:y}
}
function selecciona(e){
	//
	if(!bandera) return;
	//
	let pos = ajusta(e.clientX, e.clientY);
	//alert(pos.x+", "+pos.y);
	for(let i=0; i<cartas_array.length; i++){
		let carta = cartas_array[i];
		if(carta.x > 0){
			if(
			(pos.x > carta.x) && 
			(pos.x < carta.x+carta.ancho) && 
			(pos.y > carta.y) && 
			(pos.y < carta.y+carta.largo)){	
				if((primerCarta)||(i!=cartaPrimera)) break;	
			}
		}
	}
	//Encontramos la carta
	if(i<cartas_array.length){
		if(primerCarta){
			cartaPrimera = i;
			primerCarta = false;
			pinta(carta);
		} else {
			bandera = false;
			cartaSegunda = i;
			pinta(carta);
			primerCarta = true;
			if(cartas_array[cartaPrimera].info==cartas_array[cartaSegunda].info){
				iguales = true;	
				cartas++;
				aciertos();
			} else {
				iguales = false;	
			}
			setTimeout(volteaCarta,1000);
		}
	}
}
function volteaCarta(){
	if(cartas<pares.length){
		if(iguales==false){	
			cartas_array[cartaPrimera].dibuja();	
			cartas_array[cartaSegunda].dibuja();
		} else {
			ctx.clearRect(cartas_array[cartaPrimera].x,cartas_array[cartaPrimera].y, cartas_array[cartaPrimera].ancho, cartas_array[cartaPrimera].largo);
			ctx.clearRect(cartas_array[cartaSegunda].x,cartas_array[cartaSegunda].y, cartas_array[cartaSegunda].ancho, cartas_array[cartaSegunda].largo);
			cartas_array[cartaPrimera].x = -1;
			cartas_array[cartaSegunda].x = -1;	
		}
	}  else {
		gameOver(true);
	}
	bandera = true;
}
function gameOver(resultado){
	limpiaCanvas();
	if (resultado) {
		gameOver1_rec.dibujar();
		gameOver1_txt.dibujar();
	} else {
		gameOver2_rec.dibujar();
		gameOver2_txt.dibujar();
		gameOver3_txt.dibujar();
	}
	//
	//Definir el boton
	//
	let imagen = new Image();
	imagen.src = "images/button.png";
	imagen.onload = function(){
		ctx.drawImage(imagen, 
			final_btn.x,
			final_btn.y, 
			final_btn.ancho, 
			final_btn.alto);
		gameOver4_txt.dibujar();
		canvas.addEventListener("click", botonReinicio, false);
	}
}
function botonReinicio(e){
	let pos = ajusta(e.clientX, e.clientY);
	let xx = pos.x;
	let yy = pos.y;		
	//
	if((xx>final_btn.x)&&
		(xx<final_btn.x+final_btn.ancho)&&
		(yy>final_btn.y)&&
		(yy<final_btn.y+final_btn.alto)){
			contador = 0;
			cartas = 0;
			reloj.reiniciar();
			canvas.removeEventListener("click", botonReinicio);
			jugar();
	}
}
function limpiaCanvas(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
}
function pinta(carta){
	ctx.fillStyle = colorDelante;
	ctx.fillRect(carta.x, carta.y, carta.ancho, carta.largo); 
	var imagen = new Image();
	imagen.src = carta.img;
	imagen.onload = function(){
		ctx.drawImage(imagen, carta.x, carta.y, carta.ancho, carta.largo);	
	}
}
function aciertos(){
	/*
	ctx.fillStyle = "black";
	ctx.save();
	ctx.clearRect(0,390, canvas.width/2, 100);
	ctx.font = "bold 40px Comic";
	ctx.fillText("Aciertos: "+String(cartas), 30, 420);
	ctx.restore();
	*/
}
function inicio(){
	let imagen = new Image();
	imagen.src = "images/Pokemoninicio.jpeg";
	imagen.onload = function(){
		//
		ctx.drawImage(imagen, 
		caratula.x,
		caratula.y, 
		caratula.ancho, 
		caratula.alto);
		//
		imagen.src = "images/button.png";
		imagen.onload = function(){
			ctx.drawImage(imagen, 
				inicio_btn.x,
				inicio_btn.y, 
				inicio_btn.ancho, 
				inicio_btn.alto);
			inicio_txt.dibujar();
			canvas.addEventListener("click", botonInicio, false);
		}
	}
}
function botonInicio(e){
	let pos = ajusta(e.clientX, e.clientY);
	let xx = pos.x;
	let yy = pos.y;		
	//
	if((xx>inicio_btn.x)&&
		(xx<inicio_btn.x+inicio_btn.ancho)&&
		(yy>inicio_btn.y)&&
		(yy<inicio_btn.y+inicio_btn.alto)){
			jugar();	
	}
}
function jugar(){
	canvas.addEventListener("click",selecciona,false);
	canvas.removeEventListener("click", botonInicio);
	limpiaCanvas();
	tablero();
	barajea();
	aciertos();
	reloj.dibujar();
	miReloj = setInterval(ejecutaReloj, 1000); 
}
function ejecutaReloj(){
	reloj.dibujar();
	if(reloj.gameOver){
		clearInterval(miReloj);
		gameOver(false);
	}
}
/*** TO DO ***/
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	if(canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			caratula = new Elemento(0,0, canvas.width, canvas.height);
			inicio();
		} else {
			alert("Error al crear tu contexto");	
		}
	}
}