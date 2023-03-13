import { GameState } from "../gameState";
import boardCursor from "./boardCursor";

const currentPlayer = (game: GameState, turn: number = -1) => {

  const ord = boardCursor(game) % 2;
  return ['Black', 'White'][ord]; 
};

export default currentPlayer;