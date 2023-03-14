import { firstBoard } from 'logic/board/initialBoard';
import { pieceAt } from 'logic/positions';
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
      gamePlay: 'e2-e4,e7-e5',
    }; 

    const gameBoards = boards(gameState);
    const gameMoves = moves(gameState);

    expect(gameBoards.length).toBe(gameMoves.length + 1)
  })

  it('Recognizes en-passant capture', () => {

    const gameBoards = boards({
      gamePlay: 'e2-e4,g8-h6,e4-e5,f7-f5,e5-f6',
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
      gamePlay: 'e2-e4,g8-h6,e4-e5,f7-f5,f1-e2,g7-e6,e5-f6',
    })).toThrow()
  });
  
  it(`Handles pawn promotion`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'e2-e4,e7-e5,g1-f3,f7-f5,e4-f5,e5-e4,f5-f6,e4-f3,f6-g7,f3-g2,g7-h8(n)',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'h8')).toBe('White Knight')
    expect(gameBoards.length).toBe(12);
  });
  
  it(`Knows about castling`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'e2-e3,e7-e6,f1-d3,f8-d6,g1-f3,g8-f6,e1-g1',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'g1')).toBe('White King');
  });
  
  it(`Doesn't allow castling after the king has moved`, () => {

    expect(() => boards({
      gamePlay: 'e2-e3,e7-e6,f1-d3,f8-d6,g1-f3,g8-f6,e1-f1,e8-f8,f1-e1,f8-e8,e1-g1',
    })).toThrow()
  });
  
  it(`Doesn't allow castling after the castle has moved`, () => {

    expect(() => boards({
      gamePlay: 'e2-e3,e7-e6,f1-d3,f8-d6,g1-f3,g8-f6,h1-g1,h8-g8,g1-h1,g8-h8,e1-g1',
    })).toThrow()
  });

})