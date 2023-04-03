import pieceAt  from 'logic/squares/pieceAt'
import { initialBoard } from 'logic/board/initialBoard';


import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';

describe('pieceAt', () => {
    it('gets the white queen knight from the initial board', () => {
        expect(pieceAt(initialBoard, 'b1')).toBe('White Knight');
    });

    it('gets the black queen from the inital board', () => {
        expect(pieceAt(initialBoard, 'd8')).toBe('Black Queen')
    })

    it('gets null for a square without a piece', () => {
        expect(pieceAt(initialBoard, 'a3')).toBe(null);
    })
})