export let l = [
  // initial state:
  {
    boardCursor: 0, //(?)
    history: '',
    //DERIVED:
    moves: [], //-- derived from history only (not pointer)
    currentMove: null, //no moves yet
    board: `firstBoard`,
    castling: new Set(),
    epSquare: null,
  },

  // after 1st move:
  {
    boardCursor: 1,
    history: 'E2-E4',
    //DERIVED
    moves: [ [ 'E2', 'E4'] ],  //-- derived from history only (not pointer)
    currentMove: [ 'E2', 'E4'] ,
    board: `requires: prev-board, prev-castling, prev-ep-square`,
    castling: `requires: (prev-castling, moveFrom)`,
    epSquare: `requires: (previousBoard, moveFrom, moveTo)`
  }
]