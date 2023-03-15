import { file, rank } from 'logic/positions';
import square, { Square } from 'logic/positions/square';
import { ChessGame } from 'logic/game/gameState';
import boardCursor from './boardCursor';
import { moves } from './moves';

//TODO: MEMOIZE.
export const epSquares = (state: Pick<ChessGame, 'gamePlay'>) => {
  const movedPawns = new Set<Square>();
  const allMoves = moves(state);
  return allMoves.map((move) => {
    if (move === 'RESIGN') {
      return null
    }
    const [from, to] = move;
    if (rank(from) !== 1 && rank(from) !== 6) {
      return null;
    }
    if(movedPawns.has(from)){
      return null;
    }
    if(
      (rank(from) === 1 && rank(to) === 3) ||
      (rank(from) === 6 && rank(to) === 4) 
    ){
      const epRank = (rank(from) + rank(to)) / 2
      const sq = square([file(from), epRank])!;
      movedPawns.add(sq);
      return sq;
    }
  })
}

export const epSquare = (state: Pick<ChessGame, 'gamePlay'>, i: number) => {
  return epSquares(state)[i] ?? null;
}


const currentEnPassantSquare = (state: ChessGame) => {
  const cursor = boardCursor(state)
  if(cursor === 0){
    return null;
  }

  return epSquare(state, cursor)
}

export default currentEnPassantSquare;