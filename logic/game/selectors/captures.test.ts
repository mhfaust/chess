import { captures } from "./captures"

describe('captures', () => {

  it('Gets a single capture in 3 moves correctly', () => {
    const gameCaptures = captures({
      gamePlay: 'e2-e4,d7-d5,e4-d5'
    });

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });

  it('Records an en passant capture', () => {
    const gameCaptures = captures({
      gamePlay: 'd2-d4,g8-f6,d4-d5,e7-e5,d5-e6'
    });

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });
  
  it('Records multiple captures', () => {
    const gameCaptures = captures({
      gamePlay: 'e2-e4,f7-f5,f1-c4,f5-e4,c4-g8,h8-g8,d1-g4,d7-d5,g4-e4,d5-e4'
    });
  
    expect(gameCaptures).toStrictEqual({
      black: ['White Pawn','White Bishop','White Queen'],
      white: ['Black Knight','Black Pawn']
    });
  })
})