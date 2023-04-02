import { GameState } from "../gameState";

export const selectedSquare = (state: Pick<GameState, 'selectedSquare'>) => {
  return state.selectedSquare;
}