let whitePlayer = [];
let blackPlayer = [];

function setStart() {
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    const chessBoard = document.querySelector(`.${String.fromCharCode(i)}-2`);
    let pawn = document.createElement('div');
    pawn.classList.add('pawn');
    pawn.classList.add('white');
    pawn.innerHTML = `<img src="./images/white-pawn.png">`;
    whitePlayer.push({
      name: 'pawn',
      side: 'white',
      active: true,
      position: {
        x: String.fromCharCode(i),
        y: 2
      }
    });
    chessBoard.appendChild(pawn);
  }
  for(let i = 'A'.charCodeAt(); i <= 'H'.charCodeAt(); i++) {
    const chessBoard = document.querySelector(`.${String.fromCharCode(i)}-7`);
    let pawn = document.createElement('div');
    pawn.classList.add('pawn');
    pawn.classList.add('black');
    pawn.innerHTML = `<img src="./images/black-pawn.png">`;
    blackPlayer.push({
      name: 'pawn',
      side: 'black',
      active: true,
      position: {
        x: String.fromCharCode(i),
        y: 7
      }
    });
    chessBoard.appendChild(pawn);
  }

  
}

setStart();