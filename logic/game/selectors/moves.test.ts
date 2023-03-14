import { moves, NormalMove } from "./moves";

describe('moves', () => {

  it('Returns an empty array for a game with no moves', () => {
    const gameMoves = moves({
      gamePlay: '',
    });

    expect(gameMoves).toStrictEqual([])
  })

  it('gets Move[] from a simple first move', () => {

    const gameMoves = moves({
      gamePlay: 'e2-e4',
    });

    expect(gameMoves.length).toBe(1);
    const [ start, end ] = gameMoves[0] as NormalMove;

    expect(start).toBe('e2');
    expect(end).toBe('e4')
  });

  it('gets a move with pawn promotion', () => {
    
    const gameMoves = moves({
      gamePlay: 'e2-e4,e7-e5,g1-f3,f7-f5,e4-f5,e5-e4,f5-f6,e4-f3,f6-g7,f3-g2,g7-h8(n)',
    });

    const lastMove = [...gameMoves].pop()!;
    const [from, to, promoteTo, ...rest] = lastMove as NormalMove;

    expect(from).toBe('g7')
    expect(to).toBe('h8')
    expect(promoteTo).toBe('White Knight')
  })
  // it('throws exception if history string is not in a valid format', () => {

  // })

})