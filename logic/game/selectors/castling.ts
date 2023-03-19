import { firstBoard } from 'logic/board/initialBoard';
import nextCastlingPreclusions from 'logic/board/nextCastlingPreclusions';
import { Board } from 'logic/types/Board';
import { CastlingPreclusions, RookStartSquare } from 'logic/types/CastlingPreclusions';
import { GameAndCursor } from 'logic/game/gameState';
import { moves } from 'logic/game/selectors/moves';
import { boardCursor } from 'logic/game/selectors/boards';

const emptyPreclusions = new Set<RookStartSquare>();

// const boardCache = new Map<Board, CastlingPreclusions>([
//   [firstBoard, emptyPreclusions]
// ]);

const recurse = (gamePlay: string, i: number): CastlingPreclusions => {

  if (i === 0) {
    return emptyPreclusions;
  };

  // const gameBoards = boards(state);
  // if (boardCache.has(gameBoards[i])) {
  //   return boardCache.get(gameBoards[i])!;
  // }
  
  const prev = recurse(gamePlay, i -1);
  const move = moves({ gamePlay })[i - 1];
  if (!move || move === 'RESIGN'){
    return new Set(prev);
  }
  const [from] = move;
  const newCastling = nextCastlingPreclusions(from, prev)

  // boardCache.set(gameBoards[i], newCastling);

  return newCastling;
}

const gameCache = new Map<string, CastlingPreclusions[]>();

export const castling = ({ gamePlay }: Pick<GameAndCursor, 'gamePlay'>) => {
  if(gameCache.has(gamePlay)){
    return gameCache.get(gamePlay)!;
  };

  const newGameCacheEntry = moves({ gamePlay }).map((_, i) => recurse(gamePlay, i));
  gameCache.set(gamePlay, newGameCacheEntry);
  return newGameCacheEntry;

}

export const currentCastling = (state: GameAndCursor) => {
  const cursor = boardCursor(state);
  return recurse(state.gamePlay, cursor)
}
