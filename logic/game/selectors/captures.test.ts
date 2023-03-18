import { gamePlayCaptures } from "./captures"

describe('captures', () => {

  it('Gets a single capture in 3 moves correctly', () => {
    const gameCaptures = gamePlayCaptures('e2e4,d7d5,e4d5');

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });

  it('Records an en passant capture', () => {
    const gameCaptures = gamePlayCaptures('d2d4,g8f6,d4d5,e7e5,d5e6');

    expect(gameCaptures).toStrictEqual({
      black: [],
      white: ['Black Pawn']
    });
  });
  
  it('Records multiple captures', () => {
    const gameCaptures = gamePlayCaptures('e2e4,f7f5,f1c4,f5e4,c4g8,h8g8,d1g4,d7d5,g4e4,d5e4');
  
    expect(gameCaptures).toStrictEqual({
      black: ['White Pawn','White Bishop','White Queen'],
      white: ['Black Knight','Black Pawn']
    });
  })
});