import { firstBoard } from "rules/board/initialBoard";
import textRender from "rules/board/textRender";
import { GameState } from "rules/game/gameState";
import { pieceAt } from "rules/positions";
import { boards } from "./boards";

describe('boards', () => {

  it('gets an array with just the initial board if history is empty', () => {
    const gameState: GameState = {
      history: '',
      boardCursor: 0,
    };
    const gameBoards = boards(gameState);

    expect(gameBoards.length).toBe(1);
    expect(gameBoards[0]).toBe(firstBoard);

  });

  it('gets Boards[] from a simple first move', () => {
    const gameState: GameState = {
      history: 'E2-E4,E7-E5',
      boardCursor: 1,//<-- doesn't matter
    };
    const gameBoards = boards(gameState);

    expect(gameBoards.length).toBe(3);
  });

  it('Recognizes en-passant capture', () => {
    const gameState: GameState = {
      history: 'E2-E4,G8-H6,E4-E5,F7-F5,E5-F6',
      boardCursor: 1,//<-- doesn't matter
    };
    const gameBoards = boards(gameState);

    expect(gameBoards.length).toBe(6);
  });

  it(`Doesn't allow en-passant capture on moves too late`, () => {
    const gameState: GameState = {
      history: 'E2-E4,G8-H6,E4-E5,F7-F5,F1-E2,G7-E6,E5-F6',
      boardCursor: 1,//<-- doesn't matter
    };
    expect(() => boards(gameState)).toThrow()
  });

  it.only(`Handles pawn promotion`, () => {
    const gameState: GameState = {
      history: 'E2-E4,E7-E5,G1-F3,F7-F5,E4-F5,E5-E4,F5-F6,E4-F3,F6-G7,F3-G2,G7-H8(N)',
      boardCursor: 1,//<-- doesn't matter
    };
    const gameBoards = boards(gameState);

    const currentBoard = [...gameBoards].pop()!

    expect(pieceAt(currentBoard, 'H8')).toBe('White Knight')
    expect(gameBoards.length).toBe(12);
  });
})