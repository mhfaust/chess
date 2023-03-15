import { Player }  from 'logic/types/Player';
import { Board }  from 'logic/types/Board';
import { Square, squares } from 'logic/positions/square';
import pieceAt from 'logic/positions/pieceAt';

const whiteCache: Map<Board, Square> = new Map();
const blackCache: Map<Board, Square> = new Map();

const kingSquare = (board: Board, player: Player): Square => {
  if(player === 'Black'){
    if(blackCache.has(board)){
      return blackCache.get(board) as Square;
    }
    const found = squares.find(n =>  pieceAt(board, n) === 'Black King') as Square;
    blackCache.set(board, found);
    return found;
  } else {
    if(whiteCache.has(board)){
      return whiteCache.get(board) as Square;
    }
    const found = squares.find(n =>  pieceAt(board, n) === 'White King') as Square;
    whiteCache.set(board, found);
    return found;
  }
}

export default kingSquare;