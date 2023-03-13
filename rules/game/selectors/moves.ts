import { Move } from "rules/game/validateMoves";
import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";
import { Player } from "rules/types/Player";
import { GameState } from "rules/game/gameState";
import boardCursor from "./boardCursor";

const moveStringRegex = /([A-H][1-8])-([A-H][1-8])(\((Q|B|N|R)\))?(x(Q|B|N|R|P))?(ep)?/;

const promotions: Record<string, string> = {
  Q: 'Queen',
  B: 'Bishop',
  N: 'Knight',
  R: 'Rook',
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

  const moveStrings = state.gamePlay.split(",");
  const gameMoves = moveStrings.map((str, i) => {
    const match = str.toUpperCase().match(moveStringRegex);
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