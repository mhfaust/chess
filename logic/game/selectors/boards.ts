import { Position } from 'logic/types/Position';
import { Move, moves } from 'logic/game/selectors/moves';
import { canMoveTo } from 'logic/moves';
import { initialBoard } from 'logic/board/initialPosition';
import { castling } from 'logic/game/selectors/castling';
import { RookStartSquare } from 'logic/types/CastlingPreclusions';
import nextBoard from 'logic/board/move';
import { epSquare } from 'logic/game/selectors/enPassant';
import textRender from 'logic/board/textRender';
import { GamePlayAndCursor } from 'logic/game/gameState';

const emptyPreclusions = new Set<RookStartSquare>();

const cache = new Map<string, Position[]>([
  ['', [initialBoard]]
]);

export const boards = (game: Pick<GamePlayAndCursor, 'gamePlay'>): Position[] => {

  if(cache.has(game.gamePlay)){
    return cache.get(game.gamePlay)!;
  }

  const gameMoves = moves(game);

  const boardsArray: Position[] = gameMoves
    .reduce<Position[]>((arr: Position[], move: Move, i: number) => {
      
      if(move === 'RESIGN'){
        return arr;
      }
      const previousBoard = [...arr].pop()!;
      const gameCastling = castling(game);
      const prevPreclusions = gameCastling[i - 1] ?? emptyPreclusions;
      const ep = epSquare(game, i);

      const [from, to, promoteTo] = move;
      if(canMoveTo(previousBoard, from, to, prevPreclusions, ep)){
          const [newBoard] = nextBoard(previousBoard, from, to, ep, promoteTo);
          arr.push(newBoard)
      } else {
        throw Error(`ILLEGAL MOVE: ${from}, ${to} \n${textRender(previousBoard)}`)
      }
      return arr;
    }, [initialBoard] );

  cache.set(game.gamePlay, boardsArray);

  return boardsArray;
};

export const currentBoard = (state: GamePlayAndCursor): Position => {
  const cursor = boardCursor(state)
  return boards(state)[cursor];
};

export const previousBoard = (state: GamePlayAndCursor): Position | null => {
  const cursor = boardCursor(state)
  if(cursor === 0) {
    return null;
  }
  return boards(state)[cursor - 1];
};

export const boardCursor = (game: GamePlayAndCursor) => {
  return game.boardCursor ?? boards(game).length - 1;
}

export const latestBoardCursor = (game: GamePlayAndCursor) => {
  return boards(game).length - 1;
}

export const boardIndexes = (game: GamePlayAndCursor) => {
  return new Array(boards(game).length).fill('').map((_, i) => i);
}
