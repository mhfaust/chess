import { file, rank } from "rules/positions";
import positionName, { PositionName } from "rules/positions/positionName";
import { GameState } from "../gameState";
import boardCursor from "./boardCursor";
import { moves } from "./moves";

//TODO: MEMOIZE.
export const epSquares = (state: Pick<GameState, 'gamePlay'>) => {
  const movedPawns = new Set<PositionName>();
  const allMoves = moves(state);
  return allMoves.map(([from, to]) => {
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
      const sq = positionName([file(from), epRank])!;
      movedPawns.add(sq);
      return sq;
    }
  })
}

export const epSquare = (state: Pick<GameState, 'gamePlay'>, i: number) => {
  return epSquares(state)[i] ?? null;
}


const currentEnPassantSquare = (state: Pick<GameState, 'gamePlay' | 'boardCursor'>) => {
  const cursor = boardCursor(state)
  if(cursor === 0){
    return null;
  }

  return epSquare(state, cursor)
}

export default currentEnPassantSquare;