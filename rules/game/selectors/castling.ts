import { firstBoard } from "rules/board/initialBoard";
import nextCastlingPreclusions from "rules/board/nextCastlingPreclusions";
import { Board } from "rules/types/Board";
import { CastlingPreclusions, RookStartPosition } from "rules/types/CastlingPreclusions";
import { GameState } from "../gameState";
import { boards } from "./boards";
import { moves, currentMove } from "./moves";

const boardCache = new Map<Board, CastlingPreclusions>([
  [firstBoard, new Set<RookStartPosition>()]
]);

/**
 * recursive lookup back to find castling preclusions
 * @param state 
 * @param i index of board 
 * @returns castling preclusions set
 */
const recurse = (state: GameState, i: number): CastlingPreclusions => {

  if(i === 0){
    return new Set<RookStartPosition>();
  };

  const gameBoards = boards(state);
  if (boardCache.has(gameBoards[i])) {
    return boardCache.get(gameBoards[i])!;
  }
  
  const prev = recurse(state, i -1);
  const [from] = currentMove(state);
  const newCastling = nextCastlingPreclusions(from, prev)

  boardCache.set(gameBoards[i], newCastling);

  return newCastling;
}

// const gameCache = new Map<string, CastlingPreclusions[]>();

export const castling = (state: GameState) => {
  const { history } = state;
  // if(gameCache.has(history)){
  //   return gameCache.get(history)!;
  // };

  const newGameCacheEntry = moves(state).map((_, i) => recurse(state, i));
  // gameCache.set(state.history, newGameCacheEntry);
  return newGameCacheEntry;

}

export const currentCastling = (state: GameState) => {
  return recurse(state, state.boardCursor)
}
