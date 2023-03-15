import { firstBoard } from 'logic/board/initialBoard';
import nextCastlingPreclusions from 'logic/board/nextCastlingPreclusions';
import { Board } from 'logic/types/Board';
import { CastlingPreclusions, RookStartSquare } from 'logic/types/CastlingPreclusions';
import { ChessGame } from 'logic/game/gameState';
import boardCursor from './boardCursor';
import { moves } from './moves';

const emptyPreclusions = new Set<RookStartSquare>();

const boardCache = new Map<Board, CastlingPreclusions>([
  [firstBoard, emptyPreclusions]
]);

/**
 * recursive lookup back to find castling preclusions
 * @param state 
 * @param i index of board 
 * @returns castling preclusions set
 */
const recurse = (state: Pick<ChessGame, 'gamePlay'>, i: number): CastlingPreclusions => {

  if (i === 0) {
    return emptyPreclusions;
  };

  // const gameBoards = boards(state);
  // if (boardCache.has(gameBoards[i])) {
  //   return boardCache.get(gameBoards[i])!;
  // }
  
  const prev = recurse(state, i -1);
  const move = moves(state)[i - 1];
  if (move === 'RESIGN'){
    return new Set(prev);
  }
  const [from] = move;
  const newCastling = nextCastlingPreclusions(from, prev)

  // boardCache.set(gameBoards[i], newCastling);

  return newCastling;
}

const gameCache = new Map<string, CastlingPreclusions[]>();

export const castling = (state: Pick<ChessGame, 'gamePlay'>) => {
  const { gamePlay } = state;
  if(gameCache.has(gamePlay)){
    return gameCache.get(gamePlay)!;
  };

  const newGameCacheEntry = moves(state).map((_, i) => recurse(state, i));
  gameCache.set(gamePlay, newGameCacheEntry);
  return newGameCacheEntry;

}

export const currentCastling = (state: ChessGame) => {
  const cursor = boardCursor(state);
  return recurse(state, cursor)
}
