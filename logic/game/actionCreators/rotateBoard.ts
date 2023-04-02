import { GameState } from "../gameState";
import { Action } from "./Action";

const rotateBoard: Action = ({ orientation }: Pick<GameState, 'orientation'>) => ({ 
  orientation: ((orientation +  1))
});

export default rotateBoard;