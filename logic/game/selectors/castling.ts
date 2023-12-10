import { GamePlayAndCursor } from 'logic/game/gameState';
import { moves } from 'logic/game/selectors/moves';
import { positionCursor } from 'logic/game/selectors/positions';
import nextCastlingPreclusions from 'logic/position/nextCastlingPreclusions';
import { CastlingPreclusions, RookStartSquare } from 'logic/types/CastlingPreclusions';

const emptyPreclusions = new Set<RookStartSquare>();

// const positionCache = new Map<Position, CastlingPreclusions>([
//   [firstPosition, emptyPreclusions]
// ]);

const recurse = (gamePlay: string, i: number): CastlingPreclusions => {
	if (i === 0) {
		return emptyPreclusions;
	}

	// const gamePositions = positions(state);
	// if (positionCache.has(gamePositions[i])) {
	//   return positionCache.get(gamePositions[i])!;
	// }

	const prev = recurse(gamePlay, i - 1);
	const move = moves({ gamePlay })[i - 1];
	if (!move || move === 'RESIGN') {
		return new Set(prev);
	}
	const [from] = move;
	const newCastling = nextCastlingPreclusions(from, prev);

	// positionCache.set(gamePositions[i], newCastling);

	return newCastling;
};

const gameCache = new Map<string, CastlingPreclusions[]>();

export const castling = ({ gamePlay }: Pick<GamePlayAndCursor, 'gamePlay'>) => {
	if (gameCache.has(gamePlay)) {
		return gameCache.get(gamePlay)!;
	}

	const newGameCacheEntry = moves({ gamePlay }).map((_, i) => recurse(gamePlay, i));
	gameCache.set(gamePlay, newGameCacheEntry);
	return newGameCacheEntry;
};

export const currentCastling = (state: GamePlayAndCursor) => {
	const cursor = positionCursor(state);
	return recurse(state.gamePlay, cursor);
};
