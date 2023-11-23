let whitePlayer = [];
let blackPlayer = [];


function displayfigure(figure) {
  const chessBoard = document.querySelector(`.${(figure.position.x)}-${figure.position.y}`);
  let newFigure = document.createElement('div');
  newFigure.classList.add(figure.name);
  newFigure.classList.add(figure.side);
  newFigure.innerHTML = `<img src="./images/${figure.side}-pawn.png">`;
  chessBoard.appendChild(newFigure);
}

function setChess() {
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    whitePlayer.push({
      name: 'pawn',
      side: 'white',
      active: true,
      position: {
        x: String.fromCharCode(i),
        y: 2
      }
    });
  }
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    blackPlayer.push({
      name: 'pawn',
      side: 'black',
      active: true,
      position: {
        x: String.fromCharCode(i),
        y: 7
      }
    });
  }

  for(let i = 0; i < whitePlayer.length; i++) {
    displayfigure(whitePlayer[i]);
  }
  for(let i = 0; i < blackPlayer.length; i++) {
    displayfigure(blackPlayer[i]);
  }
}

setChess();