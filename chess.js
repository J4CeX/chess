let whitePlayer = [];
let blackPlayer = [];

let idNumber = 1;

function createFigure(nName, nSide, nX, nY) {
  whitePlayer.push({
    id: idNumber,
    name: nName,
    side: nSide,
    active: true,
    position: {
      x: nX,
      y: nY
    }
  });
  idNumber++;
}

function moveFigure() {
  
}

function displayfigure(figure) {
  const chessBoard = document.querySelector(`.${(figure.position.x)}-${figure.position.y}`);
  let newFigure = document.createElement('div');
  newFigure.classList.add(figure.name);
  newFigure.classList.add(figure.side);
  newFigure.classList.add('figure');
  newFigure.setAttribute('id', figure.id);
  newFigure.innerHTML = `<img src="./images/${figure.side}-${figure.name}.png">`;
  chessBoard.appendChild(newFigure);

  const currentFigure = document.getElementById(figure.id);
  currentFigure.addEventListener('click', () => {
    moveFigure();
  });
}

function setChess() {
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    createFigure('pawn', 'white', String.fromCharCode(i), 2);
  }
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    createFigure('pawn', 'black', String.fromCharCode(i), 7);
  }
  createFigure('quinn', 'white', 'E', 1);
  createFigure('quinn', 'black', 'E', 8);
  createFigure('hetman', 'white', 'D', 1);
  createFigure('hetman', 'black', 'D', 8);

  createFigure('rook', 'white', 'A', 1);
  createFigure('rook', 'white', 'H', 1);
  createFigure('rook', 'black', 'A', 8);
  createFigure('rook', 'black', 'H', 8);

  createFigure('knight', 'white', 'B', 1);
  createFigure('knight', 'white', 'G', 1);
  createFigure('knight', 'black', 'B', 8);
  createFigure('knight', 'black', 'G', 8);

  createFigure('bishop', 'white', 'C', 1);
  createFigure('bishop', 'white', 'F', 1);
  createFigure('bishop', 'black', 'C', 8);
  createFigure('bishop', 'black', 'F', 8);

  for(let i = 0; i < whitePlayer.length; i++) {
    displayfigure(whitePlayer[i]);
  }
  for(let i = 0; i < blackPlayer.length; i++) {
    displayfigure(blackPlayer[i]);
  }
}

setChess();