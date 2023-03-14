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
      gamePlay: 'e2e4',
    });

    expect(gameMoves.length).toBe(1);
    const [ start, end ] = gameMoves[0] as NormalMove;

    expect(start).toBe('e2');
    expect(end).toBe('e4')
  });

  it('gets a move with pawn promotion', () => {
    
    const gameMoves = moves({
      gamePlay: 'e2e4,e7e5,g1f3,f7f5,e4f5,e5e4,f5f6,e4f3,f6g7,f3g2,g7h8n',
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