import { GamePlayAndCursor } from 'logic/game/gameState';
import { epSquare } from 'logic/game/selectors//enPassant';
import { gamePlayAt } from 'logic/game/selectors//game';
import { moves } from 'logic/game/selectors/moves';
import { positions } from 'logic/game/selectors/positions';
import { pieceAt } from 'logic/squares';
import { Piece } from 'logic/squares/piece';

type Captures = {
	black: Piece[];
	white: Piece[];
};

const noCaptures: Captures = {
	white: [],
	black: [],
};

const cache = new Map<string, Captures>();

export const gamePlayCaptures = (gamePlay: string) => {
	if (gamePlay === '') {
		return noCaptures;
	}

	if (cache.has(gamePlay)) {
		return cache.get(gamePlay)!;
	}

	const gamePositions = positions({ gamePlay });
	const gameMoves = moves({ gamePlay });

	const capts = gameMoves.reduce<Captures>((acc, move, i) => {
		if (move === 'RESIGN') {
			return acc;
		}
		const [_, to] = move;
		const prevPosition = gamePositions[i];

		const captured = pieceAt(prevPosition, to);
		const isBlacksTurn = i % 2 === 1;

		const newBlackList = [...acc.black];
		const newWhiteList = [...acc.white];

		const updatedList = isBlacksTurn ? newBlackList : newWhiteList;
		if (captured) {
			updatedList.push(captured);
		} else if (to === epSquare({ gamePlay }, i)) {
			updatedList.push(isBlacksTurn ? 'White Pawn' : 'Black Pawn');
		}
		const newCaptures = {
			black: newBlackList,
			white: newWhiteList,
		};

		return newCaptures;
	}, noCaptures) ?? noCaptures;

	cache.set(gamePlay, capts);
	return capts;
};

export const currentBlackCaptures = (game: GamePlayAndCursor): Piece[] => {
	return gamePlayCaptures(gamePlayAt(game.gamePlay, game.positionCursor)).black;
};
export const currentWhiteCaptures = (game: GamePlayAndCursor): Piece[] => {
	return gamePlayCaptures(gamePlayAt(game.gamePlay, game.positionCursor)).white;
};
