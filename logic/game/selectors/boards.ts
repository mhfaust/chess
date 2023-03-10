import { Board } from 'logic/types/Board';
import { moves } from 'logic/game/selectors/moves';
import { canMoveTo } from 'logic/moves';
import { firstBoard } from 'logic/board/initialBoard';
import { castling } from 'logic/game/selectors/castling';
import { Move } from 'logic/game/validateMoves';
import { RookStartPosition } from 'logic/types/CastlingPreclusions';
import nextBoard from 'logic/board/move';
import { epSquare } from 'logic/game/selectors/enPassant';
import textRender from 'logic/board/textRender';
import boardCursor from 'logic/game/selectors/boardCursor';
import { GameState } from 'logic/game/gameState';

const emptyPreclusions = new Set<RookStartPosition>();

const cache = new Map<string, Board[]>([
  ['', [firstBoard]]
]);

export const boards = (game: Pick<GameState, 'gamePlay'>): Board[] => {

  if(cache.has(game.gamePlay)){
    return cache.get(game.gamePlay)!;
  }

  const gameMoves = moves(game);

  const boardsArray: Board[] = gameMoves
    .reduce<Board[]>((arr: Board[], move: Move, i: number) => {

      const previousBoard = [...arr].pop()!;
      const gameCastling = castling(game);
      const prevPreclusions = gameCastling[i - 1] ?? emptyPreclusions;
      const ep = epSquare(game, i - 1);

      const [from, to, promoteTo] = move;
      if(canMoveTo(previousBoard, from, to, prevPreclusions, ep)){
          const [newBoard] = nextBoard(previousBoard, from, to, ep, promoteTo);
          arr.push(newBoard)
      } else {
        throw Error(`ILLEGAL MOVE: ${from}, ${to} \n${textRender(previousBoard)}`)
      }
      return arr;
    }, [firstBoard] );

  cache.set(game.gamePlay, boardsArray);

  return boardsArray;
};

export const currentBoard = (state: Pick<GameState, 'gamePlay' | 'boardCursor'>): Board => {
  const cursor = boardCursor(state)
  return boards(state)[cursor];
};

export const previousBoard = (state: Pick<GameState, 'gamePlay' | 'boardCursor'>): Board | null => {
  const cursor = boardCursor(state)
  if(cursor === 0) {
    return null;
  }
  return boards(state)[cursor - 1];
};
