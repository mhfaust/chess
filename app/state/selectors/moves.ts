import { GameState } from "app/state/gameState";
import { Move } from "rules/game/validateMoves";
import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";
import { Player } from "rules/types/Player";

const moveStringRegex = /([A-H][1-8])-([A-H][1-8])(\((Q|B|N|R)\))?(x(Q|B|N|R|P))?(ep)?/;

const promotions: Record<string, string> = {
  Q: 'Queen',
  B: 'Bishop',
  N: 'Knight',
  R: 'Rook',
};

const cache = new Map<string, (Move)[]>();


export const moves = (state: Pick<GameState, 'gamePlay'>): Move[] => {

  if(cache.has(state.gamePlay)){
    return cache.get(state.gamePlay)!;
  }

  const moveStrings = state.gamePlay.split(",");
  const gameMoves = moveStrings.map((str, i) => {
    const match = str.match(moveStringRegex);
    if(!match) {
      throw Error("bad!");
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
export const currentMove = (state: GameState) => {
  const { boardCursor: boardPointer} = state;
  return moves(state)[boardPointer];
}