import { captures } from "./captures"

describe('captures', () => {

  it('Gets a single capture in 3 moves correctly', () => {
    const gameCaptures = captures({
      gamePlay: 'E2-E4,D7-D5,E4-D5'
    });

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });

  it('Records an en passant capture', () => {
    const gameCaptures = captures({
      gamePlay: 'D2-D4,G8-F6,D4-D5,E7-E5,D5-E6'
    });

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });
  
  it('Records multiple captures', () => {
    const gameCaptures = captures({
      gamePlay: 'E2-E4,F7-F5,F1-C4,F5-E4,C4-G8,H8-G8,D1-G4,D7-D5,G4-E4,D5-E4'
    });
  
    expect(gameCaptures).toStrictEqual({
      black: ['White Pawn','White Bishop','White Queen'],
      white: ['Black Knight','Black Pawn']
    });
  })
})