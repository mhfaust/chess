import nextPosition from 'logic/position/move';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Position } from 'logic/types/Position';

describe('move', () => {
	it('is in checkmate (1)', () => {
		const positionBefore: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, WP, BP, BR],
			/*  G  */ [__, __, __, __, __, BP, BQ, BK],
			/*  H  */ [__, __, __, __, __, __, BP, __],
		];

		const positionAfter: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, WP, BP, BR],
			/*  G  */ [__, __, __, __, __, BP, BQ, __],
			/*  H  */ [__, __, __, __, __, __, BP, BK],
		];

		const [next] = nextPosition(positionBefore, 'g8', 'h8', null);

		expect(next).toEqual(positionAfter);
	});
});
