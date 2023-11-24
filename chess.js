let whitePlayer = [];
let blackPlayer = [];

function createFigure(nName, nSide, nX, nY) {
  whitePlayer.push({
    name: nName,
    side: nSide,
    active: true,
    position: {
      x: nX,
      y: nY
    }
  });
}

function displayfigure(figure) {
  const chessBoard = document.querySelector(`.${(figure.position.x)}-${figure.position.y}`);
  let newFigure = document.createElement('div');
  newFigure.classList.add(figure.name);
  newFigure.classList.add(figure.side);
  newFigure.innerHTML = `<img src="./images/${figure.side}-${figure.name}.png">`;
  chessBoard.appendChild(newFigure);
  console.log(newFigure)
}

function setChess() {
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    createFigure('pawn', 'white', String.fromCharCode(i), 2);
  }
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    createFigure('pawn', 'black', String.fromCharCode(i), 7);
  }
  createFigure('quinn', 'white', 'E', 1);

  for(let i = 0; i < whitePlayer.length; i++) {
    displayfigure(whitePlayer[i]);
  }
  for(let i = 0; i < blackPlayer.length; i++) {
    displayfigure(blackPlayer[i]);
  }
}

setChess();