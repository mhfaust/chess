import { firstBoard } from "rules/board/initialBoard";
import { pieceAt } from "rules/positions";
import { boards } from "app/state/selectors/boards";
import { moves } from "app/state/selectors/moves";

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
      gamePlay: 'E2-E4,E7-E5',
    }; 

    const gameBoards = boards(gameState);
    const gameMoves = moves(gameState);

    expect(gameBoards.length).toBe(gameMoves.length + 1)
  })

  it('Recognizes en-passant capture', () => {

    const gameBoards = boards({
      gamePlay: 'E2-E4,G8-H6,E4-E5,F7-F5,E5-F6',
    });

    const board = [...gameBoards].pop()!;

    expect(gameBoards.length).toBe(6);
    expect(pieceAt(board, 'F5')).toBe(null);
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
      gamePlay: 'E2-E4,G8-H6,E4-E5,F7-F5,F1-E2,G7-E6,E5-F6',
    })).toThrow()
  });
  
  it(`Handles pawn promotion`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'E2-E4,E7-E5,G1-F3,F7-F5,E4-F5,E5-E4,F5-F6,E4-F3,F6-G7,F3-G2,G7-H8(N)',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'H8')).toBe('White Knight')
    expect(gameBoards.length).toBe(12);
  });
  
  it(`Knows about castling`, () => {
    
    const gameBoards = boards( {
      gamePlay: 'E2-E3,E7-E6,F1-D3,F8-D6,G1-F3,G8-F6,E1-G1',
    });
    
    const currentBoard = [...gameBoards].pop()!
    
    expect(pieceAt(currentBoard, 'G1')).toBe('White King');
  });
  
  it(`Doesn't allow castling after the king has moved`, () => {

    expect(() => boards({
      gamePlay: 'E2-E3,E7-E6,F1-D3,F8-D6,G1-F3,G8-F6,E1-F1,E8-F8,F1-E1,F8-E8,E1-G1',
    })).toThrow()
  });
  
  it(`Doesn't allow castling after the castle has moved`, () => {

    expect(() => boards({
      gamePlay: 'E2-E3,E7-E6,F1-D3,F8-D6,G1-F3,G8-F6,H1-G1,H8-G8,G1-H1,G8-H8,E1-G1',
    })).toThrow()
  });

})