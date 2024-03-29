import { areSameCoordinates } from '@/logic/squares';
import COORDS from '@/logic/squares/coordinates';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from '@/logic/squares/pieces-shorthand';
import { GridCoordinates } from '@/logic/types/GridCoordinates';
import { Position } from '@/logic/types/Position';
import allLinesOfAttack from './allLinesOfAttack';
import generateLinesOfAttack from './generateLinesOfAttack';

describe('generateLinesOfAttack', () => {
	it('finds the line from a bishop at c3 to e5', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, BB, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [WK, __, __, __, WP, __, __, BK],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];
		const linesOfAttack = generateLinesOfAttack(position, 'Black', 'e5');
		expect(linesOfAttack.next().value).toEqual([COORDS.d4, COORDS.c3]);
		expect(linesOfAttack.next().done).toBe(true);
	});

	it('does not produce a line from a that is not orthoganally aligned with defender', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, BR, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, __, __, WP, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];
		const linesOfAttack = generateLinesOfAttack(position, 'Black', 'e5');
		const returned = linesOfAttack.next();
		expect(returned.value).toBeNull();
		expect(returned.done).toBe(true);
	});

	it('does not produce a line from a knight 2 steps away', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, BN, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [__, __, __, __, WP, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [BN, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];

		const linesOfAttack = generateLinesOfAttack(position, 'Black', 'e5');
		const returned = linesOfAttack.next();
		expect(returned.value).toBeNull();
		expect(returned.done).toBe(true);
	});

	it('Sees a king attack', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, BK, __, __, __],
			/*  E  */ [__, __, __, __, WP, __, __, __],
			/*  F  */ [__, __, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];
		const linesOfAttack = generateLinesOfAttack(position, 'Black', 'e5');
		expect(linesOfAttack.next().value).toEqual([COORDS.d5]);
		expect(linesOfAttack.next().done).toBe(true);
	});

	it('finds several lines of attack', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, WR, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, WB, __, __, __],
			/*  E  */ [__, WP, __, __, __, __, __, __],
			/*  F  */ [__, WK, BB, __, __, __, WQ, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, WN, __, __, __, __],
		];
		const linesOfAttack: GridCoordinates[][] = allLinesOfAttack(position, 'White', 'f3');

		const expectedLines: GridCoordinates[][] = [
			[COORDS.e2],
			[COORDS.f2],
			[COORDS.h4],
			[COORDS.e4, COORDS.d5],
			[COORDS.f4, COORDS.f5, COORDS.f6, COORDS.f7],
			[COORDS.e3, COORDS.d3, COORDS.c3, COORDS.b3, COORDS.a3],
		];

		for (let attackLine of linesOfAttack) {
			expect(expectedLines.some(line => {
				line.forEach((coord, i) => attackLine[i] && areSameCoordinates(coord, attackLine[i]));
			}));
		}

		expect(linesOfAttack.length).toBe(expectedLines.length);
	});
});
