let whitePlayer = [];
let blackPlayer = [];

let board = [];
for(let i = 0; i < 8; i++) {
  board[i] = [];
  for(let j = 0; j < 8; j++) {
    board[i][j] = true;
  }
}

let turn = 'white';
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

function moveFigure(currentFigure) {
  let nX = currentFigure.position.x.charCodeAt() - 65;
  let nY = currentFigure.position.y - 1;
  const figurePosition = document.querySelector(`.${(currentFigure.position.x)}-${currentFigure.position.y}`);

  if(currentFigure.side === 'white' && turn === 'white') {
    switch(currentFigure.name) {
      case 'pawn': {
        if(currentFigure.position.y === 2 && board[nY + 2][nX] === true && board[nY + 1][nX] === true) {
          for(let i = 1; i <= 2; i++)
          {
            const move = document.querySelector(`.${(currentFigure.position.x)}-${currentFigure.position.y + i}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = true;
              figurePosition.innerHTML = '';
              currentFigure.position.y += i;
              displayFigure(currentFigure);
              const buttons = document.querySelectorAll('.move-button');
              buttons.forEach((btn) => {
                btn.remove();
              });
            })
            button.innerHTML = 'DOT';
            move.appendChild(button);
          }

          turn = 'black';
        } else {
          if(board[nY + 1][nX] === true) {
            const move = document.querySelector(`.${(currentFigure.position.x)}-${currentFigure.position.y + 1}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = true;
              figurePosition.innerHTML = '';
              currentFigure.position.y += 1;
              displayFigure(currentFigure);
              const buttons = document.querySelectorAll('.move-button');
              buttons.forEach((btn) => {
                btn.remove();
              });
            })
            button.innerHTML = 'DOT';
            move.appendChild(button);
            
            turn = 'black';
          }
        }
        break;
      }
      case 'rook': {

        break;
      }
      case 'knight': {

        break;
      }
      case 'bishop': {

        break;
      }
      case 'hetman': {

        break;
      }
      case 'quinn': {

        break;
      }
    }
  } else if(currentFigure.side == 'black' && turn === 'black') {
    switch(currentFigure.name) {
      case 'pawn': {
        if(currentFigure.position.y === 7 && board[nY - 2][nX] === true && board[nY - 1][nX] === true) {
          for(let i = 1; i <= 2; i++)
          {
            const move = document.querySelector(`.${(currentFigure.position.x)}-${currentFigure.position.y - i}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = true;
              figurePosition.innerHTML = '';
              currentFigure.position.y -= i;
              displayFigure(currentFigure);
              const buttons = document.querySelectorAll('.move-button');
              buttons.forEach((btn) => {
                btn.remove();
              });
            })
            button.innerHTML = 'DOT';
            move.appendChild(button);
          }

          turn = 'white';
        } else {
          if(board[nY - 1][nX] === true) {
            const move = document.querySelector(`.${(currentFigure.position.x)}-${currentFigure.position.y + 1}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = true;
              figurePosition.innerHTML = '';
              currentFigure.position.y += 1;
              displayFigure(currentFigure);
              const buttons = document.querySelectorAll('.move-button');
              buttons.forEach((btn) => {
                btn.remove();
              });
            })
            button.innerHTML = 'DOT';
            move.appendChild(button);
            
            turn = 'white';
          }
        }
        break;
      }
      case 'rook': {

        break;
      }
      case 'knight': {

        break;
      }
      case 'bishop': {

        break;
      }
      case 'hetman': {

        break;
      }
      case 'quinn': {

        break;
      }
    }
  }
}

function displayFigure(figure) {
  board[figure.position.y - 1][figure.position.x.charCodeAt() - 65] = false;

  const figurePosition = document.querySelector(`.${(figure.position.x)}-${figure.position.y}`);
  let newFigure = document.createElement('div');
  newFigure.classList.add(figure.name);
  newFigure.classList.add(figure.side);
  newFigure.classList.add('figure');
  newFigure.setAttribute('id', figure.id);
  newFigure.innerHTML = `<img src="./images/${figure.side}-${figure.name}.png">`;
  figurePosition.appendChild(newFigure);

  const currentFigure = document.getElementById(figure.id);
  currentFigure.addEventListener('click', () => {
    moveFigure(figure);
  });
}

function displayFigures() {
  whitePlayer.forEach((figure) => {
    displayFigure(figure);
  })

  blackPlayer.forEach((figure) => {
    displayFigure(figure);
  })
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

  displayFigures();
}

setChess();