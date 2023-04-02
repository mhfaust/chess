import { GameView } from "../gameState";
import { Action } from "./Action";

const rotateBoard: Action = ({ orientation }: Pick<GameView, 'orientation'>) => ({ 
  orientation: ((orientation +  1))
});

export default rotateBoard;