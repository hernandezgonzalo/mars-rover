var rovers = [
  { //declarar Rover 1
    direction: 'N',
    x: 2,
    y: 3,
    travelLog: [],
    id: '1'
  },
  { //declarar Rover 2
    direction: 'N',
    x: 5,
    y: 3,
    travelLog: [],
    id: '2'
  }
];

var board = [ //declarar tablero con obstáculos
  ['◦','◦','◦','◦','◦','◦','◦','◦','◦','◦'],
  ['◦','◦','X','◦','◦','◦','◦','X','◦','◦'],
  ['◦','◦','◦','◦','X','◦','◦','◦','◦','◦'],
  ['◦','◦','◦','◦','◦','◦','◦','◦','X','◦'],
  ['◦','X','◦','◦','◦','◦','◦','◦','◦','◦'],
  ['◦','◦','◦','X','◦','◦','◦','◦','◦','◦'],
  ['◦','◦','◦','◦','◦','X','◦','◦','◦','◦'],
  ['◦','◦','◦','◦','◦','◦','◦','◦','◦','◦'],
  ['◦','◦','X','◦','◦','◦','◦','◦','X','◦'],
  ['◦','◦','◦','◦','◦','◦','◦','◦','◦','◦']
];

const EMP = '◦', OBS = 'X'; //declarar las constantes que representan los espacios vacios y los obstáculos

rovers.forEach(function(rover){
  board[rover.y][rover.x] = rover.id; //añadir la posición actual de los Rovers en el tablero
});
console.log(formatBoard()); //imprimir tablero por primera vez

/* girar Rover a la izquierda */
function turnLeft(rover){
  var direction = rover.direction;
  switch(direction){
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
  console.log(`La dirección actual del Rover ${rover.id} es ${rover.direction}`);
}

/* girar Rover a la derecha */
function turnRight(rover){
  var direction = rover.direction;
  switch(direction){
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
  console.log(`La dirección actual del Rover ${rover.id} es ${rover.direction}`);
}

/* mover Rover hacia delante */
function moveForward(rover){
  var direction = rover.direction;
  var newX = rover.x;
  var newY = rover.y;
  switch(direction){
    case 'N':
      newY--;
      break;
    case 'E':
      newX++;
      break;
    case 'S':
      newY++;
      break;
    case 'W':
      newX--;
      break;
  }
  addNewPosition(rover, newX, newY);
}

/* mover Rover hacia atrás */
function moveBackward(rover){
  var direction = rover.direction;
  var newX = rover.x;
  var newY = rover.y;
  switch(direction){
    case 'N':
      newY++;
      break;
    case 'E':
      newX--;
      break;
    case 'S':
      newY--;
      break;
    case 'W':
      newX++;
      break;
  }
  addNewPosition(rover, newX, newY);
}

/* comprobar si la nueva posición es válida y añadirla */
function addNewPosition(rover, x, y){
  if (typeof board[y] !== 'undefined' && typeof board[y][x] !== 'undefined'){ //comprobar si la nueva posición está dentro del tablero
    if (board[y][x] === EMP){ //comprobar si la nueva posición no está ocupada
      rover.travelLog.push([rover.x, rover.y]); //iñadir la anterior posición al registro de posiciones
      board[rover.y][rover.x] = EMP; //borrar posición anterior del Rover en el tablero
      rover.x = x;
      rover.y = y;
      board[y][x] = rover.id; //añadir la posición nueva del Rover en el tablero
      console.log(`La posición actual del Rover ${rover.id} es X = ${rover.x} Y = ${rover.y}`);
    } else if (board[y][x] === OBS){ //comprobar si en la nueva posición hay un obstáculo
      console.log(`¡Obstáculo encontrado! La posición del Rover ${rover.id} sigue siendo X = ${rover.x} Y = ${rover.y}`);
    } else { //en la nueva posición hay otro Rover
      console.log(`¡El Rover ${board[y][x]} está en el camino! La posición del Rover ${rover.id} sigue siendo X = ${rover.x} Y = ${rover.y}`);
    }
  } else {
      console.log(`¡Posición fuera de límites! La posición del Rover ${rover.id} sigue siendo X = ${rover.x} Y = ${rover.y}`);
  }
}

/* gestionar los comandos introducidos por consola */
function commands(idRover, list){
  var rover = null;
  console.clear();
  rovers.forEach(function(r){ //buscar el Rover elegido en el array de Rovers
    if (r.id == idRover){
      rover = r;
    }
  });
  if (rover !== null){ //comprobar que el Rover elegido exista en el array
    for (i = 0; i < list.length; i++){ //recorrer el string con los comandos introducidos
      if (list[i] === 'f'){
        moveForward(rover);
      } else if (list[i] === 'r') {
        turnRight(rover);
      } else if (list[i] === 'l') {
        turnLeft(rover);
      } else if (list[i] === 'b') {
        moveBackward(rover);
      } else {
        console.log(`El comando ${list[i]} no es válido`)
      }
    }
    console.log(`Recorrido realizado por el Rover ${rover.id}: ` + rover.travelLog.join(' \u009B '));
  } else {
    console.log('El Rover elegido no existe')
  }
  console.log(formatBoard()); //imprimir tablero después de realizar todas las operaciones
}

/* Formatear el tablero para imprimir por pantalla */
function formatBoard(){
  var salida = '';
  board.forEach(function(fila){
    salida += fila.join(' ');
    salida += '\n';
  });
  return(salida);
}