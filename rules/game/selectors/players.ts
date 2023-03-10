import { GameState } from "../gameState";
import currentTurn from "./turn";

const currentPlayer = (game: GameState, turn: number = -1) => {

  const ord = currentTurn(game) % 2;
  return ['Black', 'White'][ord]; 
};

export default currentPlayer;