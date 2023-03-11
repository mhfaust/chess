import { GameState } from "rules/game/gameState";
import { moves } from "./moves";

describe('moves', () => {

  it('gets Move[] from a simple first move', () => {
    const gameState: GameState = {
      gamePlay: 'E2-E4',
      boardCursor: 1,
    };
    const gameMoves = moves(gameState);
    expect(gameMoves.length).toBe(1);
    const [ start, end ] = gameMoves[0];
    expect(start).toBe('E2');
    expect(end).toBe('E4')
  });

  it('gets a move with pawn promotion', () => {
    const gameState: GameState = {
      gamePlay: 'E2-E4,E7-E5,G1-F3,F7-F5,E4-F5,E5-E4,F5-F6,E4-F3,F6-G7,F3-G2,G7-H8(N)',
      boardCursor: 1,
    };
    
    const gameMoves = moves(gameState);
    const lastMove = [...gameMoves].pop()!;
    const [from, to, promoteTo, ...rest] = lastMove;
    expect(from).toBe('G7')
    expect(to).toBe('H8')
    expect(promoteTo).toBe('White Knight')
  })
  // it('throws exception if history string is not in a valid format', () => {

  // })

})