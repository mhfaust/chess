import { GameState } from "rules/game/gameState";
import { Move } from "rules/game/validateMoves";
import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";

const moveStringRegex = /([A-H][1-8])-([A-H][1-8])(\((Q|B|N|R)\))?(x(Q|B|N|R|P))?(ep)?/;

const cache = new Map<string, (Move)[]>();

/**
 * 
 * @param state 
 * @returns array of moves
 */
export const moves = (state: GameState): Move[] => {

  if(cache.has(state.history)){
    return cache.get(state.history)!;
  }

  const moveStrings = state.history.split("'");
  const gameMoves = moveStrings.map(str => {
    const match = str.match(moveStringRegex);
    if(!match) {
      throw Error("bad!");
    }
    const [, start, end, promote] = match;
    const move: Move = [ 
      start as PositionName, 
      end as PositionName, 
      promote as Piece | undefined 
    ];

    return move;
  });
  cache.set(state.history, gameMoves);
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