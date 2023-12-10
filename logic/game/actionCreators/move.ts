import { moveHash } from 'logic/position/move';
import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';
import { GameState } from '../gameState';

export type MoveParams = Parameters<typeof move>;

const move = (
	from: Square,
	to: Square,
	promoteTo: Piece | undefined,
	onMove: (gamePlay: string) => void,
) =>
(gameView: Pick<GameState, 'gamePlay' | 'positionCursor'>) => {
	const newHash = moveHash([from, to, promoteTo]);

	const { gamePlay, positionCursor } = gameView;
	const nextGamePlay = (gamePlay && `${gamePlay},`) + newHash;

	onMove(nextGamePlay);

	return {
		gamePlay: nextGamePlay,
		positionCursor: positionCursor + 1,
	};
};

export type MoveReturn = ReturnType<typeof move>;

export default move;
