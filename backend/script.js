//VARIABLES GLOBALES
var time = new Date();
var deltaTime = 0; //Rastrea milisegundso que tarda en actualizarse el juego

if (document.readyState === "complete" || document.readyState === "interactive") 
//readyState describe el estado de carga del documento.
//Si es complete o interactive, se llama a Init
{
  setTimeout(Init, 1); 
} else {
  document.addEventListener("DOMContentLoaded", Init);
}

//INICIALIZACIÓN DEL JUEGO
function Init() 
{
  time = new Date();
  Start(); 
  Loop(); 
}

//ACTUALIZACIÓN DEL JUEGO
function Update() {
  if (parado) return;

  //Llamadas a funciones
  MoveFloor();
  MoveDino();
  AñadirNube();
  AñadirCoin();
  AñadirObstaculos();
  MoverObstaculos();
  MoverNube();
  MoveCoin();
  DetectarColision();
  DetectarMoneda();
  ResetGame();


  //Gravedad
  velY -= gravedad * deltaTime;

}

//BUCLE DEL JUEGO
function Loop() {
  deltaTime = (new Date() - time) / 1000;
  time = new Date();
  Update()
  requestAnimationFrame(Loop);
}

//VARIABLES DEL JUEGO
var floorY = 22;
var velY = 0;
var impulso = 950;
var gravedad = 3500;

var dinoPosX = 42;
var dinoPosY = floorY;

var floorX = 0;
var velEscenario = 1280 / 3;
var gameVel = 1;
var score = 0;

var parado = false;
var jumping = false;

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.5;
var tiempoObstaculoMax = 1.5;
var ObstaculoPosY = 16;
var obstaculos = [];

var tiempoHastaCoin = 1.5;
var tiempoHastaCoinMin = 0.5;
var tiempoHastaCoinMax = 2;
var coinPsY = 100;
var coins = [];

var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270;
var minNubeY = 100;
var clouds = [];
var velNube = 0.5;

var container;
var dino;
var textScore;
var floor;
var gameOver;
var restart;



function Start() {
  gameOver = document.querySelector(".game-over");
  restart = document.querySelector(".restart");
  floor = document.querySelector("#floor");
  container = document.querySelector("#game-container");
  textScore = document.querySelector("#score");
  dino = document.querySelector("#dino");

  document.addEventListener("keydown", HandleKeyDown);
}

// ACCIÓN SALTO CON BARRA ESPACIADORA (32)
function HandleKeyDown(ev) {
  if (ev.keyCode == 32) {
    Jump();
  }
}

//SALTO
function Jump() {
  if (dinoPosY === floorY) {
    jumping = true;
    velY = impulso;
    dino.classList.remove("dino-running");
    
  }
}

//MOVIMIENTO DEL DINOSAURIO
function MoveDino() {
  dinoPosY += velY * deltaTime; //Calcula el desplazamiento del dino (velocidad * tiempo)
  if (dinoPosY < floorY) {
    TocarSuelo();
  }
  dino.style.bottom = dinoPosY + "px"; //Actualiza la posición del dino en el eje Y
}

//EL DINOSAURIO TOCA EL SUELO
function TocarSuelo() {
  dinoPosY = floorY;
  velY = 0;
  if (jumping) {
    dino.classList.add("dino-running");
  }
  jumping = false;
}

function MoveFloor() { //El suelo se mueve a la izquierda
  floorX += CalcularDesplazamiento();
  floor.style.left = -(floorX % container.clientWidth) + "px";
}

//CALCULO DE DESPLAZAMIENTO
function CalcularDesplazamiento() {
  return velEscenario * deltaTime * gameVel; 
  //Calcula el desplazamiento del escenario (velocidad * tiempo * velocidad del juego)
}

//CIELO Y CLIMA
function AñadirNube() {
  tiempoHastaNube -= deltaTime;
    if(tiempoHastaNube <= 0) {
        CrearNube();
    }
}

function CrearNube() {
  var cloud = document.createElement("div");
    container.appendChild(cloud);
    cloud.classList.add("cloud");
    cloud.posX = container.clientWidth;
    cloud.style.left = container.clientWidth+"px";
    cloud.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
    
    clouds.push(cloud);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function MoverNube() {
  for (var i = clouds.length - 1; i >= 0; i--) {
    if(clouds[i].posX < -clouds[i].clientWidth) {
        clouds[i].parentNode.removeChild(clouds[i]);
        clouds.splice(i, 1);
        }else
          {
            clouds[i].posX -= CalcularDesplazamiento() * velNube;
            clouds[i].style.left = clouds[i].posX+"px";
        }
    }
}

//APARICIÓN DE OBSTACULOS
function AñadirObstaculos() {
  tiempoHastaObstaculo -= deltaTime; //Tiempo entre obstaculos
  if (tiempoHastaObstaculo <= 0) {
    CrearObstaculo();
  }
}

function CrearObstaculo() {
  var obstaculo = document.createElement("div");
  container.appendChild(obstaculo);
  obstaculo.classList.add("cactus");
  if(Math.random() > 0.5) {
    obstaculo.classList.add("cactus2");
  }
  obstaculo.posX = container.clientWidth;
  obstaculo.style.left = container.clientWidth + "px"; //Posición inicial del obstaculo

  obstaculos.push(obstaculo); //Añade el nuevo obstaculo al array de obstaculos
  tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * 
  (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel; 
}

//MOVIMIENTO DEL CACTUS
function MoverObstaculos() {
  for (var i = obstaculos.length - 1; i >= 0; i--) {
    if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
      obstaculos[i].parentNode.removeChild(obstaculos[i]);
      obstaculos.splice(i, 1);
    } else {
      obstaculos[i].posX -= CalcularDesplazamiento();
      obstaculos[i].style.left = obstaculos[i].posX + "px";
    }
  }
}

//CREAR MONEDAS
function AñadirCoin() {
  tiempoHastaCoin -= deltaTime;
  if (tiempoHastaCoin <= 0) {
    CrearCoin();
  }
  
}

function CrearCoin() {
  var coin = document.createElement("div")
  container.appendChild(coin);
  coin.classList.add("coin");
  coin.posX = container.clientWidth;
  coin.style.left = container.clientWidth + "px"
  coin.style.bottom = coinPsY + "px";

  coins.push(coin);
  tiempoHastaCoin = tiempoHastaCoinMin + Math.random() * 
  (tiempoHastaCoinMax - tiempoHastaCoinMin) / gameVel;
}

function MoveCoin() {
  for (var i = coins .length - 1; i >= 0; i--) {
    if (coins [i].posX < -coins [i].clientWidth) {
      coins [i].parentNode.removeChild(coins [i]);
      coins.splice(i, 1);
    } else {
      coins [i].posX -= CalcularDesplazamiento();
      coins [i].style.left = coins [i].posX + "px";
    }
  } 
}

//PUNTOS
function GetPoints() {
  score++;
  textScore.innerHTML = score
}

//ELIMINADO
function GameOver() {
  Crash();
  gameOver.style.display = "block";
  restart.style.display = "block";
}

//REINICIAR JUEGO
function ResetGame() {
  restart.addEventListener("click", () => {
  window.location.reload(); //Tarda entre 5 y 10s en recargar la página.
  console.log("Reiniciando juego...");
  });
}

//COLISIÓN CONTRA CACTUS
function Crash() {
  dino.classList.remove("dino-running");
  dino.classList.add("dino-crashed");
  parado = true;
}

//DETECTAR COLISIÓN CONTRA CACTUS
function DetectarColision() {
  for (var i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
      //EVADE COLISIÓN
      break; //al estar en orden, no puede chocar con más
    } else {
      if (IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
        GameOver();
      }
    }
  }
}

//DETECTAR MONEDAS
function DetectarMoneda () {
  for (var i = 0; i < coins.length; i++) {
    if (coins[i].posX > dinoPosX + dino.clientWidth) {
      break;
    } else {   
    if (IsCollision(dino, coins[i], 15, 0, 10, 0)) {
        console.log("Moneda recogida");
        // GetPoints();
        GameOver();
        coins[i].parentNode.removeChild(coins[i]);
        coins.splice(i, 1);
      }
    }
  }
}


//COLISIÓN ENTRE ELEMENTOS
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
  var aRect = a.getBoundingClientRect(); //Devuelve tamaño objeto y su posición relativa al viewport
  var bRect = b.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
    (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
    (aRect.left + paddingLeft > (bRect.left + bRect.width))
  ) //Calcula si hay colisión entre a y b.
  // Tiene en cuenta el padding para ajustar la zona de colisión

  return !IsCollision;
}
