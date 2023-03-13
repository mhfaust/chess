import { firstBoard } from "rules/board/initialBoard";
import nextCastlingPreclusions from "rules/board/nextCastlingPreclusions";
import { Board } from "rules/types/Board";
import { CastlingPreclusions, RookStartPosition } from "rules/types/CastlingPreclusions";
import { GameState } from "../gameState";
import boardCursor from "./boardCursor";
import { boards } from "./boards";
import { moves, currentMove } from "./moves";

const emptyPreclusions = new Set<RookStartPosition>();

const boardCache = new Map<Board, CastlingPreclusions>([
  [firstBoard, emptyPreclusions]
]);

/**
 * recursive lookup back to find castling preclusions
 * @param state 
 * @param i index of board 
 * @returns castling preclusions set
 */
const recurse = (state: Pick<GameState, 'gamePlay'>, i: number): CastlingPreclusions => {

  if (i === 0) {
    return emptyPreclusions;
  };

  // const gameBoards = boards(state);
  // if (boardCache.has(gameBoards[i])) {
  //   return boardCache.get(gameBoards[i])!;
  // }
  
  const prev = recurse(state, i -1);
  const [from] = moves(state)[i - 1];
  const newCastling = nextCastlingPreclusions(from, prev)

  // boardCache.set(gameBoards[i], newCastling);

  return newCastling;
}

const gameCache = new Map<string, CastlingPreclusions[]>();

export const castling = (state: Pick<GameState, 'gamePlay'>) => {
  const { gamePlay } = state;
  if(gameCache.has(gamePlay)){
    return gameCache.get(gamePlay)!;
  };

  const newGameCacheEntry = moves(state).map((_, i) => recurse(state, i));
  gameCache.set(gamePlay, newGameCacheEntry);
  return newGameCacheEntry;

}

export const currentCastling = (state: GameState) => {
  const cursor = boardCursor(state);
  return recurse(state, cursor)
}
