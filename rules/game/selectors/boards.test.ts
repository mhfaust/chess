import { firstBoard } from "rules/board/initialBoard";
import textRender from "rules/board/textRender";
import { GameState } from "rules/game/gameState";
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
      boardCursor: 1,
    };
    const gameBoards = boards(gameState);

    gameBoards.forEach(b => console.log(textRender(b)))
    expect(gameBoards.length).toBe(3);
  });

  it.only('Recognizes en-passant capture', () => {
    const gameState: GameState = {
      history: 'E2-E4,G8-H6,E4-E5,F7-F5,E5-F6',
      boardCursor: 1,
    };
    const gameBoards = boards(gameState);

    gameBoards.forEach(b => console.log(textRender(b)))
    expect(gameBoards.length).toBe(6);
  });
})