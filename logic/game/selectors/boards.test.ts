import { firstBoard } from 'logic/board/initialBoard';
import { pieceAt } from 'logic/squares';
import { boards } from 'logic/game/selectors/boards';
import { moves } from 'logic/game/selectors/moves';

describe('boards', () => {

  it('gets an array with just the initial board if history is empty', () => {

    const gameBoards = boards({
      gamePlay: '',
    });

    expect(gameBoards.length).toBe(1);
    expect(gameBoards[0]).toBe(firstBoard);
  });

  it('presents a number of boards equal to the number of moves + 1', () => {

    const gameState = {
      gamePlay: 'e2e4,e7e5',
    }; 

    const gameBoards = boards(gameState);
    const gameMoves = moves(gameState);

    expect(gameBoards.length).toBe(gameMoves.length + 1)
  })

  it('Recognizes en-passant capture', () => {

    const gameBoards = boards({
      gamePlay: 'e2e4,g8h6,e4e5,f7f5,e5f6',
    });

    const board = [...gameBoards].pop()!;

    expect(gameBoards.length).toBe(6);
    expect(pieceAt(board, 'f5')).toBe(null);
  });

  it('Presents onlly the initial board if no moves in the game', () => {

    const gameBoards = boards({
      gamePlay: '',
    });
    expect(gameBoards.length).toBe(1);

    const board = gameBoards[0];
    expect(board).toStrictEqual(firstBoard);
  });

  it(`Doesn't allow en-passant capture on move too late`, () => {

    expect(() => boards({
      gamePlay: 'e2e4,g8h6,e4e5,f7f5,f1e2,g7e6,e5f6',
    })).toThrow()
  });
  
  it(`Handles pawn promotion`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'e2e4,e7e5,g1f3,f7f5,e4f5,e5e4,f5f6,e4f3,f6g7,f3g2,g7h8n',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'h8')).toBe('White Knight')
    expect(gameBoards.length).toBe(12);
  });
  
  it(`Knows about castling`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,e1g1',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'g1')).toBe('White King');
    expect(pieceAt(currentBoard, 'f1')).toBe('White Rook');
  });
  
  it(`Doesn't allow castling after the king has moved`, () => {

    expect(() => boards({
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,e1f1,e8f8,f1e1,f8e8,e1g1',
    })).toThrow()
  });
  
  it(`Doesn't allow castling after the castle has moved`, () => {

    expect(() => boards({
      gamePlay: 'e2e3,e7e6,f1d3,f8d6,g1f3,g8f6,h1g1,h8g8,g1h1,g8h8,e1g1',
    })).toThrow()
  });

})