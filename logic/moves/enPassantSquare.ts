import { file, pieceAt, rank }  from 'rules/positions'
import positionName, { PositionName }  from 'rules/positions/positionName'
import { Board }  from 'rules/types/Board';

const blackPawnStartRank = 6;
const whitePawnStartRank = 1;

const cache: Map<Board, PositionName | null> = new Map();

export const pawnPositionFromEpSquare: Map<PositionName, PositionName> = new Map([
  ['A3', 'A4'],
  ['B3', 'B4'],
  ['C3', 'C4'],
  ['D3', 'D4'],
  ['E3', 'E4'],
  ['F3', 'F4'],
  ['G3', 'G4'],
  ['H3', 'H4'],
  ['A6', 'A5'],
  ['B6', 'B5'],
  ['C6', 'C5'],
  ['D6', 'D5'],
  ['E6', 'E5'],
  ['F6', 'F5'],
  ['G6', 'G5'],
  ['H6', 'H5'],
]);

const enPassantSquare = (
  currentBoard: Board,
  lastMovedFrom: PositionName,
  lastMovedTo: PositionName,
): PositionName | null => {

  if(cache.has(currentBoard)){
    return cache.get(currentBoard)!;
  }

  const piece = pieceAt(currentBoard, lastMovedTo) ;

  if (piece === 'Black Pawn' 
    && rank(lastMovedFrom) === blackPawnStartRank 
    && rank(lastMovedTo) === blackPawnStartRank - 2
  ) {
    const position = positionName([file(lastMovedFrom), blackPawnStartRank - 1])
    cache.set(currentBoard, position)
    return position;
  }

  else if (piece === 'White Pawn'
    && rank(lastMovedFrom) === whitePawnStartRank 
    && rank(lastMovedTo) === whitePawnStartRank + 2
  ){
    const position = positionName([file(lastMovedFrom), whitePawnStartRank + 1]);
    cache.set(currentBoard, position);
    return position;
  }

  return null;
};

export default enPassantSquare;


