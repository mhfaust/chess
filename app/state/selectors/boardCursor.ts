import { GameState } from "../gameState";
import { boards } from "./boards";

const boardCursor = (game: GameState) => {
  return game.boardCursor ?? boards(game).length - 1;
}

export default boardCursor;