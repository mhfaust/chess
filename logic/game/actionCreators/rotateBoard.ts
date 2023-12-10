import { GameState } from 'logic/game/gameState';

const rotateBoard = () => ({ orientation }: Pick<GameState, 'orientation'>) => ({
	orientation: (orientation + 1),
});

export default rotateBoard;
