import { initialPosition } from 'logic/position/initialPosition';
import { pieceAt } from 'logic/squares';
import { positions } from 'logic/game/selectors/positions';
import { moves } from 'logic/game/selectors/moves';

describe('boards', () => {

  it('gets an array with just the initial board if history is empty', () => {

    const gamePositions = positions({
      gamePlay: '',
    });

    expect(gamePositions.length).toBe(1);
    expect(gamePositions[0]).toBe(initialPosition);
  });

  it('presents a number of boards equal to the number of moves + 1', () => {

    const gameState = {
      gamePlay: 'e2e4,e7e5',
    }; 

    const gamePositions = positions(gameState);
    const gameMoves = moves(gameState);

    expect(gamePositions.length).toBe(gameMoves.length + 1)
  })

  it('Recognizes en-passant capture', () => {

    const gamePositions = positions({
      gamePlay: 'e2e4,g8h6,e4e5,f7f5,e5f6',
    });

    const board = [...gamePositions].pop()!;

    expect(gamePositions.length).toBe(6);
    expect(pieceAt(board, 'f5')).toBe(null);
  });

  it('Presents onlly the initial board if no moves in the game', () => {

    const gamePositions = positions({
      gamePlay: '',
    });
    expect(gamePositions.length).toBe(1);

    const board = gamePositions[0];
    expect(board).toStrictEqual(initialPosition);
  });

  it(`Doesn't allow en-passant capture on move too late`, () => {

    expect(() => positions({
      gamePlay: 'e2e4,g8h6,e4e5,f7f5,f1e2,g7e6,e5f6',
    })).toThrow()
  });
  
  it(`Handles pawn promotion`, () => {
    
    const gamePositions = positions( {
      gamePlay: 'e2e4,e7e5,g1f3,f7f5,e4f5,e5e4,f5f6,e4f3,f6g7,f3g2,g7h8n',
    });
    
    const currentPosition = [...gamePositions].pop()!
    
    expect(pieceAt(currentPosition, 'h8')).toBe('White Knight')
    expect(gamePositions.length).toBe(12);
  });
  
  it(`Knows about castling`, () => {
    
    const gamePositions = positions( {
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,e1g1',
    });
    
    const currentPosition = [...gamePositions].pop()!
    
    expect(pieceAt(currentPosition, 'g1')).toBe('White King');
    expect(pieceAt(currentPosition, 'f1')).toBe('White Rook');
  });
  
  it(`Doesn't allow castling after the king has moved`, () => {

    expect(() => positions({
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,e1f1,e8f8,f1e1,f8e8,e1g1',
    })).toThrow()
  });
  
  it(`Doesn't allow castling after the castle has moved`, () => {

    expect(() => positions({
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,h1g1,h8g8,g1h1,g8h8,e1g1',
    })).toThrow()
  });

})