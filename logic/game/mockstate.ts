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
    history: 'e2-e4',
    //DERIVED
    moves: [ [ 'e2', 'e4'] ],  //-- derived from history only (not pointer)
    currentMove: [ 'e2', 'e4'] ,
    board: `requires: prev-board, prev-castling, prev-ep-square`,
    castling: `requires: (prev-castling, moveFrom)`,
    epSquare: `requires: (previousBoard, moveFrom, moveTo)`
  }
]