import { Piece } from 'logic/positions/piece';
import { PositionName } from 'logic/positions/positionName';
import { Player } from 'logic/types/Player';
import { GameState } from 'logic/game/gameState';
import boardCursor from './boardCursor';

export type NormalMove = [PositionName, PositionName, Piece | undefined];

export type Move = NormalMove | 'RESIGN';

//(x(Q|B|N|R|P))?(ep)?
const normalMoveRegex = /([a-h][1-8])([a-h][1-8])((q|b|n|r))?/;

const promotions: Record<string, string> = {
  q: 'Queen',
  b: 'Bishop',
  n: 'Knight',
  r: 'Rook',
};

const cache = new Map<string, (Move)[]>();

const noMoves: Move[] = [];

export const moves = (state: Pick<GameState, 'gamePlay'>): Move[] => {

  if(!state.gamePlay) {
    return noMoves;
  }

  if(cache.has(state.gamePlay)){
    return cache.get(state.gamePlay)!;
  }

  const moveStrings = state.gamePlay.split(',');

  const gameMoves = moveStrings.map((str, i) => {
    if(str === 'RESIGN') {
      return 'RESIGN';
    }

    const match = str.toLowerCase().match(normalMoveRegex);
    if(!match) {
      throw Error(`Illegal move: ${str}.`);
    }
    const [, start, end, , promote,] = match;
    const promo = promotions[promote];
    const player: Player = i % 2 === 0 ? 'White' : 'Black'
    const promotion = promo && (`${player} ${promo}` as Piece) || undefined;
    const move: Move = [ 
      start as PositionName, 
      end as PositionName, 
      promotion,
    ];

    return move;
  });
  cache.set(state.gamePlay, gameMoves);
  return gameMoves;
}

/**
 * Gets the move that resulted in the current board.
 * @param state 
 * @returns 
 */
export const currentMove = (state: Pick<GameState, 'gamePlay' | 'boardCursor'>) => {
  const cursor = boardCursor(state)
  return moves(state)[cursor - 1];
}