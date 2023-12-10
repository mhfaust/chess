import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Square } from 'logic/squares/square';
import { Position } from 'logic/types/Position';
import pawnMoves from './pawnMoves';

type TestCases = { pawnSquare: Square; attackedSquares: Square[] }[];

const pawn1Position: Position = [
	/*         1  2  3  4  5  6  7  8  */
	/*  A  */ [WR, WP, __, __, __, __, BP, BR],
	/*  B  */ [WN, WP, __, BP, __, __, __, BN],
	/*  C  */ [WB, __, WP, __, BP, __, __, BB],
	/*  D  */ [WQ, __, __, WP, __, BP, __, BQ],
	/*  E  */ [WK, WP, __, __, BP, __, __, BK],
	/*  F  */ [WB, WP, __, __, __, __, BP, BB],
	/*  G  */ [WN, WP, __, __, BP, __, __, BN],
	/*  H  */ [WR, __, __, WP, BP, __, __, BR],
];

describe('white pawn', () => {
	const testCases: TestCases = [
		{ pawnSquare: 'a2', attackedSquares: ['a3', 'a4'] },
		{ pawnSquare: 'b2', attackedSquares: ['b3'] },
		{ pawnSquare: 'c3', attackedSquares: ['c4', 'b4'] },
		{ pawnSquare: 'd4', attackedSquares: ['c5', 'd5', 'e5'] },
		{ pawnSquare: 'e2', attackedSquares: ['e3', 'e4'] },
		{ pawnSquare: 'f2', attackedSquares: ['f3', 'f4'] },
		{ pawnSquare: 'g2', attackedSquares: ['g3', 'g4'] },
		{ pawnSquare: 'h4', attackedSquares: ['g5'] },
	];

	testCases.forEach((testCase) => {
		it(`provides all possible moves from pawn at ${(testCase.pawnSquare)} on pawn1Position: `, () => {
			const position = pawn1Position;
			const foundMoves = pawnMoves(position, testCase.pawnSquare, null);

			expect(foundMoves).toEqual(new Set(testCase.attackedSquares));
		});
	});
});

describe('black pawn', () => {
	const testCases: TestCases = [
		{ pawnSquare: 'a7', attackedSquares: ['a6', 'a5'] },
		{ pawnSquare: 'b4', attackedSquares: ['b3', 'c3'] },
		{ pawnSquare: 'c5', attackedSquares: ['c4', 'd4'] },
		{ pawnSquare: 'd6', attackedSquares: ['d5'] },
		{ pawnSquare: 'e5', attackedSquares: ['d4', 'e4'] },
		{ pawnSquare: 'f7', attackedSquares: ['f6', 'f5'] },
		{ pawnSquare: 'g5', attackedSquares: ['g4', 'h4'] },
		{ pawnSquare: 'h5', attackedSquares: [] },
	];

	testCases.forEach((testCase) => {
		it(`provides all possible moves from pawn at ${(testCase.pawnSquare)} on pawn1Position: `, () => {
			const position = pawn1Position;
			const foundMoves = pawnMoves(position, testCase.pawnSquare, null);

			expect(foundMoves).toEqual(new Set(testCase.attackedSquares));
		});
	});
});

describe('en passant', () => {
	const position: Position = [
		/*         1  2  3  4  5  6  7  8  */
		/*  A  */ [WR, WP, __, __, __, __, BP, BR],
		/*  B  */ [WN, WP, __, __, __, __, BP, BN],
		/*  C  */ [WB, WP, __, __, __, __, BP, BB],
		/*  D  */ [WQ, WP, __, BP, __, __, __, BQ],
		/*  E  */ [WK, __, __, WP, __, __, BP, BK],
		/*  F  */ [WB, WP, __, __, __, __, BP, BB],
		/*  G  */ [WN, WP, __, __, BP, __, __, BN],
		/*  H  */ [WR, __, __, __, WP, __, BP, BR],
	];

	it('black pawn can attack a square passed by a white pawn moving from rank 2 to 4', () => {
		const foundMoves = pawnMoves(position, 'd4', 'e3');
		expect(foundMoves).toContain('e3');
	});

	it('black pawn cannot attack a passant-looking square if passant info is null', () => {
		const foundMoves = pawnMoves(position, 'd4', null);
		expect(foundMoves).not.toContain('e3');
	});

	it('white pawn can attack a square passed by a black pawn moving from rank 2 to 4', () => {
		const foundMoves = pawnMoves(position, 'h5', 'g6');
		expect(foundMoves).toContain('g6');
	});

	it('white pawn cannot attack a passant-looking square if passant info is null', () => {
		const foundMoves = pawnMoves(position, 'h5', null);
		expect(foundMoves).not.toContain('g6');
	});
});

describe('check', () => {
	it('Only move is capture', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [WK, __, __, __, __, __, __, BK],
			/*  F  */ [__, WP, __, __, __, __, __, __],
			/*  G  */ [__, __, BB, __, __, __, __, __],
			/*  H  */ [__, __, __, __, __, __, __, __],
		];
		const expectedLegalMoves = new Set([
			'g3',
		]);

		const foundLegalMoves = pawnMoves(position, 'f2', null);

		expect(foundLegalMoves).toEqual(expectedLegalMoves);
	});

	it('Pinned pawn cant move', () => {
		const position: Position = [
			/*         1  2  3  4  5  6  7  8  */
			/*  A  */ [__, __, __, __, __, __, __, __],
			/*  B  */ [__, __, __, __, __, __, __, __],
			/*  C  */ [__, __, __, __, __, __, __, __],
			/*  D  */ [__, __, __, __, __, __, __, __],
			/*  E  */ [WK, __, BP, __, __, __, __, BK],
			/*  F  */ [__, WP, __, __, __, __, __, __],
			/*  G  */ [__, __, __, __, __, __, __, __],
			/*  H  */ [__, __, __, BQ, __, __, __, __],
		];
		const expectedLegalMoves = new Set([]);

		const foundLegalMoves = pawnMoves(position, 'f2', null);

		expect(foundLegalMoves).toEqual(expectedLegalMoves);
	});
});
