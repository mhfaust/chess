import knightMoves from 'logic/moves/knightMoves';
import { initialPosition } from 'logic/position/initialPosition';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Position } from 'logic/types/Position';

describe('knight', () => {
	it('can move from initial position white queen knight to a3 and c3 only', () => {
		const legalMoves = knightMoves(initialPosition, 'b1');

		expect(legalMoves).toContain('a3');
		expect(legalMoves).toContain('c3');
		expect(legalMoves.size).toBe(2);
	});

	it('can move from initial position white king knight to a3 and c3 only', () => {
		const legalMoves = knightMoves(initialPosition, 'g1');

		expect(legalMoves).toContain('f3');
		expect(legalMoves).toContain('h3');
		expect(legalMoves.size).toBe(2);
	});

	it('can move from initial position black queen knight to a3 and c3 only', () => {
		const legalMoves = knightMoves(initialPosition, 'b8');

		expect(legalMoves).toContain('a6');
		expect(legalMoves).toContain('c6');
		expect(legalMoves.size).toBe(2);
	});

	it('can move from initial position black king knight to a3 and c3 only', () => {
		const legalMoves = knightMoves(initialPosition, 'g8');

		expect(legalMoves).toContain('f6');
		expect(legalMoves).toContain('h6');
		expect(legalMoves.size).toBe(2);
	});

	it('Can capture only enemy pieces', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, BK],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, BP, __, WP, __, __],
			/*  D  */ [__, __, BP, __, __, __, BP, __],
			/*  E  */ [WK, __, __, __, BK, __, __, __],
			/*  F  */ [__, __, BP, __, __, __, BP, __],
			/*  G  */ [__, __, __, WP, __, BP, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];
		const expectedLegalMoves = new Set([
			'c6',
			'g4',
		]);

		const foundLegalMoves = knightMoves(position, 'e5');

		expect(foundLegalMoves).toEqual(expectedLegalMoves);
	});

	it('Pinned knight cant move', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, WP, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [WK, WR, __, __, BN, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, WP, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		const expectedLegalMoves = new Set([]);

		const foundLegalMoves = knightMoves(position, 'e5');

		expect(foundLegalMoves).toEqual(expectedLegalMoves);
	});
});
