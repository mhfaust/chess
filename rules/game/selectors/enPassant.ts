import enPassantSquare from "rules/moves/enPassantSquare";
import { file, rank } from "rules/positions";
import positionName, { PositionName } from "rules/positions/positionName";
import { GameState } from "../gameState";
import { Move } from "../validateMoves";
import { boards, previousBoard } from "./boards";
import { moves } from "./moves";



//TODO: MEMOIZE.
export const epSquares = (state: GameState) => {
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

export const epSquare = (state: GameState, i: number) => {
  return epSquares(state)[i] ?? null;
}


const currentEnPassantSquare = (state: GameState) => {
  const { boardCursor } = state;
  if(boardCursor === 0){
    return null;
  }

  return epSquare(state, boardCursor)
}

export default currentEnPassantSquare;