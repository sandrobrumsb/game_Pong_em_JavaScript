//Variaveis da bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;

//Variaveis da velocidade da bolinha:
let velocidadeXBolinha = 10;
let velocidadeyBolinha = 6;

//Variaveis da raquete:
 let xRaquete = 5;
 let yRaquete = 150;
 let raqueteComprimento = 10;
 let raquetealtura = 90;

//raquete do oponente:
 let xRaqueteOponente = 585;
 let yRaqueteOponente = 150;
 let velocidadeYoponente;

let colidiu = false;

//placar do jogo:
let meusPontos = 0;
let pontosDoOponente=0;

//sons do jogo:
let raquetada;
let meuPonto;
let pontoAdversario;
let trilha;

//chance de erro oponente jogo:
let chanceDeErrar = 0;


function preload(){
  trilha = loadSound("trilhadojogo.wav");
  meuPonto = loadSound("meuponto.wav");
  pontoAdversario = loadSound("pontoadversario.wav");
  raquetada = loadSound("raquetada.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  //bolinhaNaoFicaPresa();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  VerificaColisaoRaquete(xRaquete,yRaquete);
  VerificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
}

function mostrabolinha(){
  circle(xBolinha,yBolinha,diametro);

}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeyBolinha;
}


function verificaColisaoBorda(){
  
  if (xBolinha + raio > width || xBolinha - raio < 0 ){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0 ){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x,y){
    rect(x,y,raqueteComprimento,raquetealtura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW))
    yRaquete -= 10;
  
  if(keyIsDown(DOWN_ARROW))
    yRaquete += 10;
  
// Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaquete = constrain(yRaquete, 10, 310);

}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raquetealtura && yBolinha + raio > yRaquete)
    velocidadeXBolinha *= -1;
    raquetada.play();
}

function VerificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raquetealtura,xBolinha,yBolinha,raio);

  if(colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
  
}


function  movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYoponente + chanceDeErrar;
  calculaChanceDeErrar()
  
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(0, 181, 26));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(0, 181, 26));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,470,26);
}

function marcaPonto(){
  if(xBolinha>590){
    meusPontos += 1;
    meuPonto.play();
  }
  
  if(xBolinha < 10){
    pontosDoOponente += 1;
    pontoAdversario.play();
  }
  
}

/*
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 300
    }
}
*/