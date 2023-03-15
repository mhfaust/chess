import { file, pieceAt, rank }  from 'logic/positions'
import square, { Square }  from 'logic/positions/square'
import { Board }  from 'logic/types/Board';

const blackPawnStartRank = 6;
const whitePawnStartRank = 1;

const cache: Map<Board, Square | null> = new Map();

export const pawnPositionFromEpSquare: Map<Square, Square> = new Map([
  ['a3', 'a4'],
  ['b3', 'b4'],
  ['c3', 'c4'],
  ['d3', 'd4'],
  ['e3', 'e4'],
  ['f3', 'f4'],
  ['g3', 'g4'],
  ['h3', 'h4'],
  ['a6', 'a5'],
  ['b6', 'b5'],
  ['c6', 'c5'],
  ['d6', 'd5'],
  ['e6', 'e5'],
  ['f6', 'f5'],
  ['g6', 'g5'],
  ['h6', 'h5'],
]);

const enPassantSquare = (
  currentBoard: Board,
  lastMovedFrom: Square,
  lastMovedTo: Square,
): Square | null => {

  if(cache.has(currentBoard)){
    return cache.get(currentBoard)!;
  }

  const piece = pieceAt(currentBoard, lastMovedTo) ;

  if (piece === 'Black Pawn' 
    && rank(lastMovedFrom) === blackPawnStartRank 
    && rank(lastMovedTo) === blackPawnStartRank - 2
  ) {
    const position = square([file(lastMovedFrom), blackPawnStartRank - 1])
    cache.set(currentBoard, position)
    return position;
  }

  else if (piece === 'White Pawn'
    && rank(lastMovedFrom) === whitePawnStartRank 
    && rank(lastMovedTo) === whitePawnStartRank + 2
  ){
    const position = square([file(lastMovedFrom), whitePawnStartRank + 1]);
    cache.set(currentBoard, position);
    return position;
  }

  return null;
};

export default enPassantSquare;


