import { GamePlayAndCursor } from '@/logic/game/gameState';
import { positionCursor } from '@/logic/game/selectors/positions';
import { Player } from '@/logic/types/Player';

const players = ['White', 'Black'] as const;

const currentPlayer = (game: GamePlayAndCursor): Player => {
	const ord = positionCursor(game) % 2;
	return players[ord];
};

export default currentPlayer;
