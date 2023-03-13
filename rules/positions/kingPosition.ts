import { Player }  from 'rules/types/Player';
import { Board }  from 'rules/types/Board';
import { PositionName, positionNames } from 'rules/positions/positionName';
import pieceAt from 'rules/positions/pieceAt';

const whiteCache: Map<Board, PositionName> = new Map();
const blackCache: Map<Board, PositionName> = new Map();

const kingPosition = (board: Board, player: Player): PositionName => {
  if(player === 'Black'){
    if(blackCache.has(board)){
      return blackCache.get(board) as PositionName;
    }
    const found = positionNames.find(n =>  pieceAt(board, n) === 'Black King') as PositionName;
    blackCache.set(board, found);
    return found;
  } else {
    if(whiteCache.has(board)){
      return whiteCache.get(board) as PositionName;
    }
    const found = positionNames.find(n =>  pieceAt(board, n) === 'White King') as PositionName;
    whiteCache.set(board, found);
    return found;
  }
}

export default kingPosition;