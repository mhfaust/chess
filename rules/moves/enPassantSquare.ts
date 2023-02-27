import { pieceAt, rank }  from 'rules/positions'
import positionName, { PositionName }  from 'rules/positions/positionName'
import { Board }  from 'rules/types/Board';

const blackPawnStartRank = 6;
const whitePawnStartRank = 1;

const cache: Map<Board, PositionName> = new Map();

const enPassantSquare = (
  currentBoard: Board,
  lastMovedFrom: PositionName,
  lastMovedTo: PositionName,
): PositionName | null => {

  if(cache.has(currentBoard)){
    return cache.get(currentBoard);
  }

  const piece = pieceAt(currentBoard, lastMovedTo) ;

  if (piece === 'Black Pawn' 
    && rank(lastMovedFrom) === blackPawnStartRank 
    && rank(lastMovedTo) === blackPawnStartRank - 2
  ) {
    const position = positionName([rank(lastMovedFrom), blackPawnStartRank - 1])
    cache.set(currentBoard, position)
    return position;
  }

  else if (piece === 'White Pawn'
    && rank(lastMovedFrom) === whitePawnStartRank 
    && rank(lastMovedTo) === whitePawnStartRank + 2
  ){
    const position = positionName([rank(lastMovedFrom), whitePawnStartRank + 1]);
    cache.set(currentBoard, position);
  }
};

export default enPassantSquare;


