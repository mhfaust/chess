import pieceAt  from 'rules/positions/pieceAt'
import { initialBoard }  from 'rules/board'


import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'rules/positions/pieces-shorthand';

describe('pieceAt', () => {
    it('gets the white queen knight from the initial board', () => {
        expect(pieceAt(initialBoard(), 'B1')).toBe('White Knight');
    });

    it('gets the black queen from the inital board', () => {
        expect(pieceAt(initialBoard(), 'D8')).toBe('Black Queen')
    })

    it('gets null for a square without a piece', () => {
        expect(pieceAt(initialBoard(), 'A3')).toBe(null);
    })
})