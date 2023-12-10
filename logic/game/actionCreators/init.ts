import { GameState } from '../gameState';

const init = (
	initialGamePlay: string,
	initialPosition: number,
) =>
(): Pick<GameState, 'gamePlay' | 'positionCursor'> => ({
	gamePlay: initialGamePlay,
	positionCursor: initialPosition,
});

export default init;
