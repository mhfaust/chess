import { GameState } from 'rules/game/gameState';
import { Board } from 'rules/types/Board';
import { moves } from 'rules/game/selectors/moves';
import { canMoveTo } from 'rules/moves';
import { firstBoard } from 'rules/board/initialBoard';
import { castling } from './castling';
import { Move } from '../validateMoves';
import { RookStartPosition } from 'rules/types/CastlingPreclusions';
import nextBoard from 'rules/board/move';
import { epSquare } from './enPassant';

const emptyPreclusions = new Set<RookStartPosition>();

const cache = new Map<string, Board[]>([
  ['', [firstBoard]]
]);

export const boards = (game: GameState): Board[] => {

  if(cache.has(game.history)){
    return cache.get(game.history)!;
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
        throw Error('ILLEGAL MOVE!')
      }
      return arr;
    }, [firstBoard] );

  cache.set(game.history, boardsArray);

  return boardsArray;
};

export const currentBoard = (state: GameState): Board => {
  const { boardCursor: boardPointer } = state;
  return boards(state)[boardPointer];
};

export const previousBoard = (state: GameState): Board | null => {
  const { boardCursor: boardPointer } = state;
  if(boardPointer === 0) {
    return null;
  }
  return boards(state)[boardPointer - 1];
};
