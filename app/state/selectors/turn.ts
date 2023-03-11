import { GameState } from "../gameState";

const currentTurn = (game: GameState) => {
  return game.boardCursor ?? 0; //should we default to 0 or get from boards???
}

export default currentTurn;