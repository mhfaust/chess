import { GameState } from "rules/game/gameState";
import { moves } from "./moves";

describe('moves', () => {

  it('gets Move[] from a simple first move', () => {
    const gameState: GameState = {
      history: 'E2-E4',
      boardCursor: 1,
    };
    const gameMoves = moves(gameState);
    expect(gameMoves.length).toBe(1);
    const [ start, end ] = gameMoves[0];
    expect(start).toBe('E2');
    expect(end).toBe('E4')
  });

  // it('gets a move with pawn promotion', () => {

  // })
  // it('throws exception if history string is not in a valid format', () => {

  // })

})