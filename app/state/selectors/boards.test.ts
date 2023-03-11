import { firstBoard } from "rules/board/initialBoard";
import { pieceAt } from "rules/positions";
import { boards } from "./boards";

describe('boards', () => {

  it('gets an array with just the initial board if history is empty', () => {

    const gameBoards = boards({
      gamePlay: '',
    });

    expect(gameBoards.length).toBe(1);
    expect(gameBoards[0]).toBe(firstBoard);
  });

  it('gets Boards[] from a simple first move', () => {

    const gameBoards = boards({
      gamePlay: 'E2-E4,E7-E5',
    });

    expect(gameBoards.length).toBe(3);
  });

  it('Recognizes en-passant capture', () => {

    const gameBoards = boards({
      gamePlay: 'E2-E4,G8-H6,E4-E5,F7-F5,E5-F6',
    });

    expect(gameBoards.length).toBe(6);
  });

  it(`Doesn't allow en-passant capture on moves too late`, () => {

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
})