import isInCheck from '@/logic/check/isInCheck';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from '@/logic/squares/pieces-shorthand';
import { Position } from '@/logic/types/Position';

describe('isInCheck: true', () => {
	it('White King  at d4 is in check from Black King at PIECE_Square', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, WK, BK, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at d4 is in check from Black King at PIECE_Square', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, WK, __, __, __, __],
			/*  E  */ [__, __, BK, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at d4 is in check from Black King at PIECE_Square', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, BK, __, __, __, __],
			/*  D  */ [__, __, __, WK, __, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});
});

describe('isInCheck: false', () => {
	it('White King at d4 is NOT in check from Black King at d6', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, WK, __, BK, __, __],
			/*  E  */ [__, __, __, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});
});
