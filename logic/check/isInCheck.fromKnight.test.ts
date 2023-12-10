import isInCheck from 'logic/check/isInCheck';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Position } from 'logic/types/Position';

describe('isInCheck: true', () => {
	it('White King  at e3 is IN check from Black Knight at c2', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, BN, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at c4', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, BN, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at d5', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, BN, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at f5', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, BN, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at g4', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, BN, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at g2', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, BK],
			/*  G  */ [__, BN, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at f1', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [BN, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});

	it('White King  at e3 is IN check from Black Knight at d1', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [BN, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(true);
	});
});

describe('isInCheck: false', () => {
	it('White King  at e3 is NOT checked from Black Knight at a5', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, BN, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});

	it('White King  at e3 is NOT checked from White Knight at c2', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, WN, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});

	it('White King  at e3 is NOT checked from Black Knight at c3', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, BN, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});

	it('White King  at e3 is NOT checked from Black Knight at d3', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, BN, __, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});

	it('White King  at e3 is NOT checked from White Knight at d4', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, BN, __, __, __, __],
			/*  E  */ [__, __, WK, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		expect(isInCheck(position, 'White')).toBe(false);
	});
});
