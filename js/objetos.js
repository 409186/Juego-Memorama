function Carta(x, y, ancho, largo, img, info){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.largo = largo;
	this.info = info;
	this.img = img;
	this.dibuja = dibujaCarta;	
}
function Rectangulo(x,y,ancho,alto,radio, fondo,linea){
	this.x = x;
	this.y = y;
	this.w = ancho;
	this.h = alto;
	this.r = radio;
	this.f = fondo;
	this.l = linea;
	this.dibujar = function(){
		ctx.save();
		ctx.shadowBlur = 3;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowColor = "black";
		//
		ctx.beginPath();
		ctx.moveTo(this.x, this.y+this.r);
		//
		ctx.lineTo(this.x, this.y+this.h-this.r);
		ctx.quadraticCurveTo(this.x, this.y+this.h, this.x+this.r, this.y+this.h);
		//
		ctx.lineTo(this.x+this.w-this.r, this.y+this.h);
		ctx.quadraticCurveTo(this.x+this.w, this.y+this.h, this.x+this.w, this.y+this.h-this.r);
		//
		ctx.lineTo(this.x+this.w, this.y+this.r);
		ctx.quadraticCurveTo(this.x+this.w, this.y, this.x+this.w-this.r, this.y);
		//
		ctx.lineTo(this.x+this.r, this.y);
		ctx.quadraticCurveTo(this.x, this.y, this.x, this.y+this.r);
		ctx.stroke();
		ctx.fillStyle = this.f;
		ctx.strokeStyle = this.l;
		ctx.fill();
		ctx.shadowColor = "rgba(0,0,0,0)";
		ctx.restore();
	}
}
function Texto(x, y, texto, color, fuente, sombra){
	this.x = x;
	this.y = y;
	this.texto = texto;
	this.color = color;
	this.fuente = fuente;
	this.sombra = sombra;
	this.dibujar = function(){
		ctx.save();
		if(this.sombra){
			ctx.shadowBlur=5;
		    ctx.shadowOffsetX=3;
		    ctx.shadowOffsetY=3;
			ctx.shadowColor = "white";
		}    
		ctx.font = this.fuente;
		ctx.fillStyle = this.color;
		ctx.fillText(this.texto,this.x,this.y);
		ctx.shadowColor = 'rgba(0,0,0,0)';
		ctx.restore();
	};
}
function Elemento(x, y, ancho, alto){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;
}
function Reloj(margen, barra, color, x, y, ancho, alto, tiempo){
	this.margen = margen;
	this.barra = barra;
	this.color = color;
	this.tiempo = tiempo;
	this.x = x;
	this.y = y;
	this.w = ancho;
	this.h = alto;
	//
	this.porcentaje = 0;
	this.altura = 0;
	this.tiempoRestante = 0;
	this.gameOver = false;
	//
	this.dibujar = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		this.porcentaje = this.tiempoRestante / this.tiempo;
		this.altura = (this.barra-this.margen*2) * this.porcentaje;
		if(this.porcentaje<0.4){
			ctx.fillStyle = "red";
		} else if(this.porcentaje<0.6){
			ctx.fillStyle = "red";
		} else if(this.porcentaje<0.8){
			ctx.fillStyle = "red";
		} else if(this.porcentaje<0.9){
			ctx.fillStyle = "red";
		}
		ctx.fillRect(this.x+this.margen, 
			this.y+this.margen, 
			this.w-this.margen*2, 
			this.altura
		);
		this.tiempoRestante++;
		if (this.porcentaje > 0.99) {
			this.gameOver = true;
		}
	}
	this.reiniciar = function(){
		this.tiempoRestante = 0;
		this.gameOver = false;
	}
}