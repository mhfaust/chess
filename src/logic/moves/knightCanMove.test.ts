import knightCanMove from '@/logic/moves/knightCanMove';
import { initialPosition } from '@/logic/position/initialPosition';
import { __, BK, BQ, WK, WN } from '@/logic/squares/pieces-shorthand';
import { Position } from '@/logic/types/Position';

describe('knightCanMove', () => {
	it('reports true attempting to move to empty square, 2 forward, 1 left.', () => {
		const answer = knightCanMove(initialPosition, 'b1', 'a3');
		expect(answer).toBe(true);
	});

	it('reports true attempting to move to empty square, 2 forward, 1 right.', () => {
		const answer = knightCanMove(initialPosition, 'b1', 'c3');
		expect(answer).toBe(true);
	});

	it('reports false attempting to move to square occupied by own players piece.', () => {
		const answer = knightCanMove(initialPosition, 'b1', 'c2');
		expect(answer).toBe(false);
	});

	it('reports false attempting to move to mechanically disallowed square', () => {
		const answer = knightCanMove(initialPosition, 'b1', 'b4');
		expect(answer).toBe(false);
	});

	it('cannot move pinned knight', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, BK],
			/*  E  */ [WK, __, __, WN, __, __, __, BQ],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		const answer = knightCanMove(position, 'e4', 'c3');
		expect(answer).toBe(false);
	});
});
