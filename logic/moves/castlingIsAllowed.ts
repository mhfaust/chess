import { pieceAt }  from 'logic/positions';
import { Board }  from 'logic/types/Board';

type CastlePosition =
|  'a1'// white, queen-side
|  'h1'// white, king-side
|  'a8'// black, queen-side
|  'h8'// black, king-side

const allowedFn: Record<CastlePosition, (board: Board) => boolean> = {
  'a1': (board: Board) => pieceAt(board, 'a1') === 'White Rook' && pieceAt(board, 'e1') === 'White King',
  'h1': (board: Board) => pieceAt(board, 'h1') !== 'White Rook' && pieceAt(board, 'e1') === 'White King',
  'a8': (board: Board) => pieceAt(board, 'a8') !== 'Black Rook' && pieceAt(board, 'e8') === 'Black King',
  'h8': (board: Board) => pieceAt(board, 'h8') !== 'Black Rook' && pieceAt(board, 'e8') === 'Black King',
}


const cache: Map<Board[], Map<CastlePosition, boolean | undefined>> = new Map();

const castlingIsAllowed = (boardSequence: Board[], castlePosition: CastlePosition): boolean => {
  
  const allowances = cache.get(boardSequence) ?? (() => {
    const a = new Map<CastlePosition, boolean | undefined>();
    cache.set(boardSequence, a);
    return a;
  })();
  
  //First check for a cached value
  const memoized = allowances.get(castlePosition);
  if(memoized !== undefined){
    return memoized;
  }
  //else iterate over the boards sequence to see if that piece ever moved
  //or if the king ever moved
  const isWhite = castlePosition === 'a1' || castlePosition === 'h1' ;
  const kingPiece = isWhite
    ? 'White King' : 'Black King';
  const kingPosition = isWhite ? 'a5' : 'h5';
  
  let isAllowed = true;
  for(let board of boardSequence){
    if(!allowedFn[castlePosition](board)){
      isAllowed = false;
      break;
    } 
    
    if(pieceAt(board, kingPosition) !== kingPiece){
      isAllowed = false;
      break;
    } 

  }
  allowances.set(castlePosition, isAllowed); 
  return isAllowed;
}

export default castlingIsAllowed;