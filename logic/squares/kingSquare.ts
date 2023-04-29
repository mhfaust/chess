import { Player }  from 'logic/types/Player';
import { Position }  from 'logic/types/Board';
import { Square, squares } from 'logic/squares/square';
import pieceAt from 'logic/squares/pieceAt';

const whiteCache: Map<Position, Square> = new Map();
const blackCache: Map<Position, Square> = new Map();

const kingSquare = (position: Position, player: Player): Square => {
  if(player === 'Black'){
    if(blackCache.has(position)){
      return blackCache.get(position) as Square;
    }
    const found = squares.find(n =>  pieceAt(position, n) === 'Black King') as Square;
    blackCache.set(position, found);
    return found;
  } else {
    if(whiteCache.has(position)){
      return whiteCache.get(position) as Square;
    }
    const found = squares.find(n =>  pieceAt(position, n) === 'White King') as Square;
    whiteCache.set(position, found);
    return found;
  }
}

export default kingSquare;