import { Position } from 'logic/types/Position';
import { Move, moves } from 'logic/game/selectors/moves';
import { canMoveTo } from 'logic/moves';
import { initialPosition } from 'logic/position/initialPosition';
import { castling } from 'logic/game/selectors/castling';
import { RookStartSquare } from 'logic/types/CastlingPreclusions';
import nextPosition from 'logic/position/move';
import { epSquare } from 'logic/game/selectors/enPassant';
import plainTextDrawnPosition from 'logic/position/plainTextDrawnPosition';
import { GamePlayAndCursor } from 'logic/game/gameState';

const emptyPreclusions = new Set<RookStartSquare>();

const cache = new Map<string, Position[]>([
  ['', [initialPosition]]
]);

export const positions = (game: Pick<GamePlayAndCursor, 'gamePlay'>): Position[] => {

  if(cache.has(game.gamePlay)){
    return cache.get(game.gamePlay)!;
  }

  const gameMoves = moves(game);

  const positionsArray: Position[] = gameMoves
    .reduce<Position[]>((arr: Position[], move: Move, i: number) => {
      
      if(move === 'RESIGN'){
        return arr;
      }
      const previousPosition = [...arr].pop()!;
      const gameCastling = castling(game);
      const prevPreclusions = gameCastling[i - 1] ?? emptyPreclusions;
      const ep = epSquare(game, i);

      const [from, to, promoteTo] = move;
      if(canMoveTo(previousPosition, from, to, prevPreclusions, ep)){
          const [newPosition] = nextPosition(previousPosition, from, to, ep, promoteTo);
          arr.push(newPosition)
      } else {
        throw Error(`ILLEGAL MOVE: ${from}, ${to} \n${plainTextDrawnPosition(previousPosition)}`)
      }
      return arr;
    }, [initialPosition] );

  cache.set(game.gamePlay, positionsArray);

  return positionsArray;
};

export const currentPosition = (state: GamePlayAndCursor): Position => {
  const cursor = positionCursor(state)
  return positions(state)[cursor];
};

export const previousPosition = (state: GamePlayAndCursor): Position | null => {
  const cursor = positionCursor(state)
  if(cursor === 0) {
    return null;
  }
  return positions(state)[cursor - 1];
};

export const positionCursor = (game: GamePlayAndCursor) => {
  return game.boardCursor ?? positions(game).length - 1;
}

export const latestPositionCursor = (game: GamePlayAndCursor) => {
  return positions(game).length - 1;
}

export const positionIndexes = (game: GamePlayAndCursor) => {
  return new Array(positions(game).length).fill('').map((_, i) => i);
}
