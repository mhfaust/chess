import { GameState } from "rules/game/gameState";
import { boards } from "./boards";

const boardCursor = (game: Pick<GameState, 'gamePlay' | 'boardCursor'>) => {
  return game.boardCursor ?? boards(game).length - 1;
}

export default boardCursor;