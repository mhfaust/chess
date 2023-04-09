import { GameState } from "../gameState";

const init = (
  initialGamePlay: string, 
  initialPosition: number
) => (): Pick<GameState, 'gamePlay' | 'boardCursor'> => ({
  gamePlay: initialGamePlay,
  boardCursor: initialPosition,
});

export default init;