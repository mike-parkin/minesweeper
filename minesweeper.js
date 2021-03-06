document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin);
document.addEventListener('contextmenu', checkForWin);

// Define your `board` object here!
// var board = {
//   cells: [
//     {
//       row: 0,
//       col: 0,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 0,
//       col: 1,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 0,
//       col: 2,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 0,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 1,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 1,
//       col: 2,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 0,
//       isMine: false,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 1,
//       isMine: true,
//       hidden: true
//     },
//     {
//       row: 2,
//       col: 2,
//       isMine: false,
//       hidden: true
//     }
//   ]
// }
function createBoard (cellNum) {
  let board = {cells: []};
  rowCounter = 0
  colCounter = 0
  for (let i = 0; i < cellNum; i++) {
    board.cells[i] = {
      row: rowCounter,
      col: colCounter,
      isMine: Boolean(Math.random() < 0.2),
      isMarked: false,
      hidden: true
    }
    colCounter++
    if (colCounter > (Math.sqrt(cellNum) - 1)) {
      colCounter = 0; 
      rowCounter++;  
    }
  }
  return board;
}

function startGame () {

  board = createBoard(36);
  console.log(board);

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?


function checkForWin () {
  let mines = 0;
  let safeCell = 0;
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return;
    }
    if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {   
      mines++;
    }
    if (board.cells[i].hidden === false) safeCell++   
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (safeCell + mines === board.cells.length) {
    document.getElementById("tada").play();
    lib.displayMessage('You win!');
  }  
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  count = 0

  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true) {
      count++;
    }
  }
  
  return count;
}




