let whitePlayer = [];
let blackPlayer = [];

let board = [];
for(let i = 0; i < 8; i++) {
  board[i] = [];
  for(let j = 0; j < 8; j++) {
    board[i][j] = 'none';
  }
}

let turn = 'white';
let idNumber = 1;

function inBoard(x, y) {
  if(x < 'A' || x >'H') {
    return false;
  } else if(y < 1 || y > 8) {
    return false;
  } else {
    return true;
  }
}

function isEnd() {
  let count = 0;
  whitePlayer.forEach((figure) => {
    if(figure.active === true) {
      count++;
    }
  });
  if(count === 0) {
    console.log("Black wins!");
    return;
  }

  count = 0;

  blackPlayer.forEach((figure) => {
    if(figure.active === true) {
      count++;
    }
  });
  if(count === 0) {
    console.log("White wins!");
    return;
  }
}

function removeMoveButtons() {
  const buttons = document.querySelectorAll('.move-button');
  buttons.forEach((btn) => {
    btn.remove();
  });
}

function createFigure(nName, nSide, nX, nY) {
  if(nSide === 'white') {
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
  else if(nSide === 'black') {
    blackPlayer.push({
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
}

function renderMoves(currentFigure, startX, startY, side, opponentsSide) {
  let nX = currentFigure.position.x.charCodeAt() - 65;
  let nY = currentFigure.position.y - 1;
  const figurePosition = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y}`);

  let xNeg = false;
  let yNeg = false;

  let x = startX;
  let y = startY;

  if(startX < 0) {
    xNeg = true;
    x = x * -1;
  }
  if(startY < 0) {
    yNeg = true;
    y = y * -1;
  }

  while(x < 8 && y < 8) {
    if(xNeg) {
      x = x * -1;
    }
    if(yNeg) {
      y = y * -1;
    }

    const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + x);
    const moveY = currentFigure.position.y + y;
    
    if(inBoard(moveX, moveY)) {
      const move = document.querySelector(`.${moveX}-${moveY}`);
      if(board[nY + y][nX + x] === 'none') { 
        const button = document.createElement('button');
        button.classList.add('move-button');
        button.addEventListener('click', () => {
          board[nY][nX] = 'none';
          figurePosition.innerHTML = '';
          move.innerHTML = '';
          currentFigure.position.y = moveY;
          currentFigure.position.x = moveX;
          displayFigure(currentFigure);
          removeMoveButtons();
          turn = opponentsSide;
        });
        move.appendChild(button);
      } else if(board[nY + y][nX + x] === opponentsSide) {
        const targetId = move.lastChild.getAttribute('id');
        const button = document.createElement('button');
        button.classList.add('move-button');
        button.addEventListener('click', () => {
          if(opponentsSide === 'black') {
            blackPlayer[targetId - 17].active = false;
          } else if(opponentsSide === 'white') {
            whitePlayer[targetId - 1].active = false;
          }
          board[nY][nX] = 'none';
          figurePosition.innerHTML = '';
          move.innerHTML = '';
          currentFigure.position.y = moveY;
          currentFigure.position.x = moveX;
          displayFigure(currentFigure);
          removeMoveButtons();
          isEnd();
          turn = opponentsSide;
        });
        move.appendChild(button);
        break;
      } else if(board[nY + y][nX + x] === side){
        break;
      }
    }

    if(xNeg) {
      x = x * -1;
    }
    if(yNeg) {
      y = y * -1;
    }

    if(x !== 0) {
      x++;
    }
    if(y !== 0) {
      y++;
    }
  }
}

function moveFigure(currentFigure) {
  let nX = currentFigure.position.x.charCodeAt() - 65;
  let nY = currentFigure.position.y - 1;
  const figurePosition = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y}`);

  removeMoveButtons();

  if(currentFigure.side === 'white' && turn === 'white') {
    switch(currentFigure.name) {
      case 'pawn': {
        if(currentFigure.position.y === 2 && board[nY + 2][nX] === 'none' && board[nY + 1][nX] === 'none') {
          for(let i = 1; i <= 2; i++)
          {
            const move = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y + i}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = 'none';
              figurePosition.innerHTML = '';
              currentFigure.position.y += i;
              displayFigure(currentFigure);
              removeMoveButtons();
              turn = 'black';
            })
            move.appendChild(button);
          }
        } else {
          if(board[nY + 1][nX] === 'none') {
            const move = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y + 1}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = 'none';
              figurePosition.innerHTML = '';
              currentFigure.position.y += 1;
              displayFigure(currentFigure);
              removeMoveButtons();
              turn = 'black';
            })
            move.appendChild(button);
          }
        }

        if(board[nY + 1][nX - 1] === 'black') {
          const move = document.querySelector(`.${String.fromCharCode(currentFigure.position.x.charCodeAt() - 1)}-${currentFigure.position.y + 1}`);
          const targetId = move.lastChild.getAttribute('id');
          const button = document.createElement('button');
          button.classList.add('move-button');
          button.addEventListener('click', () => {
            blackPlayer[targetId - 17].active = false;
            board[nY][nX] = 'none';
            move.innerHTML = '';
            figurePosition.innerHTML = '';
            currentFigure.position.y += 1;
            currentFigure.position.x = String.fromCharCode(currentFigure.position.x.charCodeAt() - 1);
            displayFigure(currentFigure);
            removeMoveButtons();
            isEnd();
            turn = 'black';
          })
          move.appendChild(button);
        }
        if(board[nY + 1][nX + 1] === 'black') {
          const move = document.querySelector(`.${String.fromCharCode(currentFigure.position.x.charCodeAt() + 1)}-${currentFigure.position.y + 1}`);
          const targetId = move.lastChild.getAttribute('id');
          const button = document.createElement('button');
          button.classList.add('move-button');
          button.addEventListener('click', () => {
            blackPlayer[targetId - 17].active = false;
            board[nY][nX] = 'none';
            move.innerHTML = '';
            figurePosition.innerHTML = '';
            currentFigure.position.y += 1;
            currentFigure.position.x = String.fromCharCode(currentFigure.position.x.charCodeAt() + 1);
            displayFigure(currentFigure);
            removeMoveButtons();
            isEnd();
            turn = 'black';
          })
          move.appendChild(button);
        }

        break;
      }
      case 'rook': {
        renderMoves(currentFigure, 1, 0, 'white', 'black');
        renderMoves(currentFigure, -1, 0, 'white', 'black');
        renderMoves(currentFigure, 0, 1, 'white', 'black');
        renderMoves(currentFigure, 0, -1, 'white', 'black');
        break;
      }
      case 'knight': {
        for(let i = 1, j = 2; i <= 2, j >= 1; i++, j--) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black') { 
              const button = document.createElement('button');
              const targetId = move.lastChild.getAttribute('id');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                blackPlayer[targetId - 17].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white'){
              continue;
            }
          }
        }
        for(let i = -1, j = 2; i >= -2, j >= 1; i--, j--) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black') { 
              const button = document.createElement('button');
              const targetId = move.lastChild.getAttribute('id');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                blackPlayer[targetId - 17].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white'){
              continue;
            }
          }
        }
        for(let i = -1, j = -2; i >= -2, j <= -1; i--, j++) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black') { 
              const button = document.createElement('button');
              const targetId = move.lastChild.getAttribute('id');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                blackPlayer[targetId - 17].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white'){
              continue;
            }
          }
        }
        for(let i = 1, j = -2; i <= 2, j <= -1; i++, j++) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black') { 
              const button = document.createElement('button');
              const targetId = move.lastChild.getAttribute('id');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                blackPlayer[targetId - 17].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'black';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white'){
              continue;
            }
          }
        }

        break;
      }
      case 'bishop': {
        renderMoves(currentFigure, 1, 1, 'white', 'black');
        renderMoves(currentFigure, -1, -1, 'white', 'black');
        renderMoves(currentFigure, 1, -1, 'white', 'black');
        renderMoves(currentFigure, -1, 1, 'white', 'black');
        break;
      }
      case 'hetman': {
        renderMoves(currentFigure, 1, 0, 'white', 'black');
        renderMoves(currentFigure, -1, 0, 'white', 'black');
        renderMoves(currentFigure, 0, 1, 'white', 'black');
        renderMoves(currentFigure, 0, -1, 'white', 'black');
        renderMoves(currentFigure, 1, 1, 'white', 'black');
        renderMoves(currentFigure, -1, -1, 'white', 'black');
        renderMoves(currentFigure, 1, -1, 'white', 'black');
        renderMoves(currentFigure, -1, 1, 'white', 'black');
        break;
      }
      case 'quinn': {
        for(let i = -1; i <= 1; i++) {
          for(let j = -1; j <= 1; j++) {
            const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
            const moveY = currentFigure.position.y + j;

            if(inBoard(moveX, moveY)) {
              const move = document.querySelector(`.${moveX}-${moveY}`);
              if(board[nY + j][nX + i] === 'none') {
                const button = document.createElement('button');
                button.classList.add('move-button');
                button.addEventListener('click', () => {
                  board[nY][nX] = 'none';
                  figurePosition.innerHTML = '';
                  move.innerHTML = ''
                  currentFigure.position.y = moveY;
                  currentFigure.position.x = moveX;
                  displayFigure(currentFigure);
                  removeMoveButtons();
                  turn = 'black';
                });
                move.appendChild(button);
              } else if(board[nY + j][nX + i] === 'black') {
                const targetId = move.lastChild.getAttribute('id');
                const button = document.createElement('button');
                button.classList.add('move-button');
                button.addEventListener('click', () => {
                  blackPlayer[targetId - 17].active = false;
                  board[nY][nX] = 'none';
                  figurePosition.innerHTML = '';
                  move.innerHTML = ''
                  currentFigure.position.y = moveY;
                  currentFigure.position.x = moveX;
                  displayFigure(currentFigure);
                  removeMoveButtons();
                  isEnd();
                  turn = 'black';
                });
                move.appendChild(button);
              }
            }
          }
        }
        break;
      }
    }
  } else if(currentFigure.side == 'black' && turn === 'black') {
    switch(currentFigure.name) {
      case 'pawn': {
        if(currentFigure.position.y === 7 && board[nY - 2][nX] === 'none' && board[nY - 1][nX] === 'none') {
          for(let i = 1; i <= 2; i++)
          {
            const move = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y - i}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = 'none';
              figurePosition.innerHTML = '';
              currentFigure.position.y -= i;
              displayFigure(currentFigure);
              removeMoveButtons();
              turn = 'white';
            })
            move.appendChild(button);
          }
        } else {
          if(board[nY - 1][nX] === 'none') {
            const move = document.querySelector(`.${currentFigure.position.x}-${currentFigure.position.y - 1}`);
            const button = document.createElement('button');
            button.classList.add('move-button');
            button.addEventListener('click', () => {
              board[nY][nX] = 'none';
              figurePosition.innerHTML = '';
              currentFigure.position.y -= 1;
              displayFigure(currentFigure);
              removeMoveButtons();
              turn = 'white';
            })
            move.appendChild(button);
          }
        }

        if(board[nY - 1][nX - 1] === 'white') {
          const move = document.querySelector(`.${String.fromCharCode(currentFigure.position.x.charCodeAt() - 1)}-${currentFigure.position.y - 1}`);
          const targetId = move.lastChild.getAttribute('id');
          const button = document.createElement('button');
          button.classList.add('move-button');
          button.addEventListener('click', () => {
            whitePlayer[targetId].active = false;
            board[nY][nX] = 'none';
            move.innerHTML = '';
            figurePosition.innerHTML = '';
            currentFigure.position.y -= 1;
            currentFigure.position.x = String.fromCharCode(currentFigure.position.x.charCodeAt() - 1);
            displayFigure(currentFigure);
            removeMoveButtons();
            isEnd();
            turn = 'white';
          })
          move.appendChild(button);
        }
        if(board[nY - 1][nX + 1] === 'white') {
          const move = document.querySelector(`.${String.fromCharCode(currentFigure.position.x.charCodeAt() + 1)}-${currentFigure.position.y - 1}`);
          const targetId = move.lastChild.getAttribute('id');
          const button = document.createElement('button');
          button.classList.add('move-button');
          button.addEventListener('click', () => {
            whitePlayer[targetId].active = false;
            board[nY][nX] = 'none';
            move.innerHTML = '';
            figurePosition.innerHTML = '';
            currentFigure.position.y -= 1;
            currentFigure.position.x = String.fromCharCode(currentFigure.position.x.charCodeAt() + 1);
            displayFigure(currentFigure);
            removeMoveButtons();
            isEnd();
            turn = 'white';
          })
          move.appendChild(button);
        }

        break;
      }
      case 'rook': {
        renderMoves(currentFigure, 1, 0, 'black', 'white');
        renderMoves(currentFigure, -1, 0, 'black', 'white');
        renderMoves(currentFigure, 0, 1, 'black', 'white');
        renderMoves(currentFigure, 0, -1, 'black', 'white');
        break;
      }
      case 'knight': {
        for(let i = 1, j = 2; i <= 2, j >= 1; i++, j--) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white') { 
              const targetId = move.lastChild.getAttribute('id');
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                whitePlayer[targetId].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black'){
              break;
            }
          }
        }
        for(let i = -1, j = 2; i >= -2, j >= 1; i--, j--) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white') { 
              const targetId = move.lastChild.getAttribute('id');
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                whitePlayer[targetId].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black'){
              break;
            }
          }
        }
        for(let i = -1, j = -2; i >= -2, j <= -1; i--, j++) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white') { 
              const targetId = move.lastChild.getAttribute('id');
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                whitePlayer[targetId].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black'){
              break;
            }
          }
        }
        for(let i = 1, j = -2; i <= 2, j <= -1; i++, j++) {
          const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
          const moveY = currentFigure.position.y + j;

          if(inBoard(moveX, moveY)) {
            const move = document.querySelector(`.${moveX}-${moveY}`);
            if(board[nY + j][nX + i] === 'none') { 
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'white') { 
              const targetId = move.lastChild.getAttribute('id');
              const button = document.createElement('button');
              button.classList.add('move-button');
              button.addEventListener('click', () => {
                whitePlayer[targetId].active = false;
                board[nY][nX] = 'none';
                figurePosition.innerHTML = '';
                move.innerHTML = ''
                currentFigure.position.y = moveY;
                currentFigure.position.x = moveX;
                displayFigure(currentFigure);
                removeMoveButtons();
                isEnd();
                turn = 'white';
              });
              move.appendChild(button);
            } else if(board[nY + j][nX + i] === 'black'){
              break;
            }
          }
        }
        break;
      }
      case 'bishop': {
        renderMoves(currentFigure, 1, 1, 'black', 'white');
        renderMoves(currentFigure, -1, -1, 'black', 'white');
        renderMoves(currentFigure, 1, -1, 'black', 'white');
        renderMoves(currentFigure, -1, 1, 'black', 'white');
        break;
      }
      case 'hetman': {
        renderMoves(currentFigure, 1, 0, 'black', 'white');
        renderMoves(currentFigure, -1, 0, 'black', 'white');
        renderMoves(currentFigure, 0, 1, 'black', 'white');
        renderMoves(currentFigure, 0, -1, 'black', 'white');
        renderMoves(currentFigure, 1, 1, 'black', 'white');
        renderMoves(currentFigure, -1, -1, 'black', 'white');
        renderMoves(currentFigure, 1, -1, 'black', 'white');
        renderMoves(currentFigure, -1, 1, 'black', 'white');
        break;
      }
      case 'quinn': {
        for(let i = -1; i <= 1; i++) {
          for(let j = -1; j <= 1; j++) {
            const moveX = String.fromCharCode(currentFigure.position.x.charCodeAt() + i);
            const moveY = currentFigure.position.y + j;

            if(inBoard(moveX, moveY)) {
              const move = document.querySelector(`.${moveX}-${moveY}`);
              if(board[nY + j][nX + i] === 'none') {
                const button = document.createElement('button');
                button.classList.add('move-button');
                button.addEventListener('click', () => {
                  board[nY][nX] = 'none';
                  figurePosition.innerHTML = '';
                  move.innerHTML = ''
                  currentFigure.position.y = moveY;
                  currentFigure.position.x = moveX;
                  displayFigure(currentFigure);
                  removeMoveButtons();
                  turn = 'white';
                });
                move.appendChild(button);
              } else if(board[nY + j][nX + i] === 'white') {
                const targetId = move.lastChild.getAttribute('id');
                const button = document.createElement('button');
                button.classList.add('move-button');
                button.addEventListener('click', () => {
                  whitePlayer[targetId].active = false;
                  board[nY][nX] = 'none';
                  figurePosition.innerHTML = '';
                  move.innerHTML = ''
                  currentFigure.position.y = moveY;
                  currentFigure.position.x = moveX;
                  displayFigure(currentFigure);
                  removeMoveButtons();
                  isEnd();
                  turn = 'white';
                });
                move.appendChild(button);
              }
            }
          }
        }
      }
    }
  }
}

function displayFigure(figure) {
  if(figure.side === 'white') {
    board[figure.position.y - 1][figure.position.x.charCodeAt() - 65] = 'white';
  } else if(figure.side === 'black') {
    board[figure.position.y - 1][figure.position.x.charCodeAt() - 65] = 'black';
  }

  const figurePosition = document.querySelector(`.${figure.position.x}-${figure.position.y}`);
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
  createFigure('quinn', 'white', 'E', 1);
  createFigure('hetman', 'white', 'D', 1);
  createFigure('rook', 'white', 'A', 1);
  createFigure('rook', 'white', 'H', 1);
  createFigure('knight', 'white', 'B', 1);
  createFigure('knight', 'white', 'G', 1);
  createFigure('bishop', 'white', 'C', 1);
  createFigure('bishop', 'white', 'F', 1);
  
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    createFigure('pawn', 'black', String.fromCharCode(i), 7);
  }
  createFigure('quinn', 'black', 'E', 8);
  createFigure('hetman', 'black', 'D', 8);
  createFigure('rook', 'black', 'A', 8);
  createFigure('rook', 'black', 'H', 8);
  createFigure('knight', 'black', 'B', 8);
  createFigure('knight', 'black', 'G', 8);
  createFigure('bishop', 'black', 'C', 8);
  createFigure('bishop', 'black', 'F', 8);

  displayFigures();
}

setChess();