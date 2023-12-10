import { initialPosition } from 'logic/position/initialPosition';
import pieceAt from 'logic/squares/pieceAt';

import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';

describe('pieceAt', () => {
	it('gets the white queen knight from the initial board', () => {
		expect(pieceAt(initialPosition, 'b1')).toBe('White Knight');
	});

	it('gets the black queen from the inital board', () => {
		expect(pieceAt(initialPosition, 'd8')).toBe('Black Queen');
	});

	it('gets null for a square without a piece', () => {
		expect(pieceAt(initialPosition, 'a3')).toBe(null);
	});
});
