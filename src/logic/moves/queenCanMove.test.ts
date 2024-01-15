import queenCanMove from '@/logic/moves/queenCanMove';
import { __, BK, BP, WK, WQ, WR } from '@/logic/squares/pieces-shorthand';
import { Position } from '@/logic/types/Position';

describe('queenCanMove', () => {
	const queen1Position: Position = [
		/*         1  2  3  4  5  6  7  8  */
		/*  A  */ [__, __, __, __, __, __, __, __],
		/*  B  */ [__, __, __, __, __, __, __, __],
		/*  C  */ [__, WQ, __, WK, __, __, BP, __],
		/*  D  */ [__, __, __, __, __, __, __, __],
		/*  E  */ [__, __, __, __, __, __, __, BK],
		/*  F  */ [__, __, __, __, BP, __, __, __],
		/*  G  */ [__, WR, __, __, __, __, __, __],
		/*  H  */ [__, __, __, __, __, __, __, __],
	];

	it('can move right one', () => {
		expect(queenCanMove(queen1Position, 'c2', 'c3')).toBe(true);
	});

	it('cannot take own piece', () => {
		expect(queenCanMove(queen1Position, 'c2', 'c4')).toBe(false);
	});

	it('can capture opponent piece, diagonally', () => {
		expect(queenCanMove(queen1Position, 'c2', 'f5')).toBe(true);
	});
});
