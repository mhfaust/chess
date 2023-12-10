import bishopCanMove from 'logic/moves/bishopCanMove';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Position } from 'logic/types/Position';

describe('bishopCanMove', () => {
	const bishop1Position: Position = [
		/*         1  2  3  4  5  6  7  8  */
		/*  A  */ [__, __, __, __, __, __, __, __],
		/*  B  */ [__, __, __, __, __, WP, __, __],
		/*  C  */ [__, __, __, __, __, __, __, __],
		/*  D  */ [__, __, __, WB, __, __, __, __],
		/*  E  */ [WK, __, __, __, __, __, __, BK],
		/*  F  */ [__, __, __, __, __, __, __, __],
		/*  G  */ [__, __, __, __, __, __, BP, __],
		/*  H  */ [__, __, __, __, __, __, __, BR],
	];

	it('can advance left', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'c5');
		expect(answer).toBe(true);
	});

	it('can advance right', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'f6');
		expect(answer).toBe(true);
	});

	it('can retreat left', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'a1');
		expect(answer).toBe(true);
	});

	it('can retreat right', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'g1');
		expect(answer).toBe(true);
	});

	it('cannot move unequal forward and right displacements', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'h6');
		expect(answer).toBe(false);
	});

	it('canot move laterally', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'h4');
		expect(answer).toBe(false);
	});

	it('canot advance forward', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'd8');
		expect(answer).toBe(false);
	});

	it('cannot capture own piece', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'b6');
		expect(answer).toBe(false);
	});

	it('can capture opponent piece', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'g7');
		expect(answer).toBe(true);
	});

	it('cannot move beyond a piece', () => {
		const answer = bishopCanMove(bishop1Position, 'd4', 'h8');
		expect(answer).toBe(false);
	});

	it('Cannot put self in check', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [WK, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, WB, __, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, BB, __],
			/*  H  */ [__, __, __, __, __, __, __, BR],
		];

		expect(bishopCanMove(position, 'd4', 'e3')).toBe(false);
		expect(bishopCanMove(position, 'd4', 'c5')).toBe(false);
	});

	it('Can move along axis of potential check while blocking check', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [WK, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, WB, __, __, __, __],
			/*  E  */ [__, __, __, __, __, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, BB, __],
			/*  H  */ [__, __, __, __, __, __, __, BR],
		];

		expect(bishopCanMove(position, 'd4', 'c3')).toBe(true);
		expect(bishopCanMove(position, 'd4', 'b2')).toBe(true);
		expect(bishopCanMove(position, 'd4', 'e5')).toBe(true);
		expect(bishopCanMove(position, 'd4', 'f6')).toBe(true);
		expect(bishopCanMove(position, 'd4', 'g7')).toBe(true);
	});
});
