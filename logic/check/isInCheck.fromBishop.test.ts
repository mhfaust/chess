import isInCheck  from 'logic/check/isInCheck';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('isInCheck: true', () => {
    it('White King at F3 is IN check from Black Bishop at E4', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,BB,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at D5', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,BB,__,__,__],
/*  E  */ [__,__,__,__,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at A8', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,BB],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at E2', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,BB,__,__,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at H1', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [BB,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at H5', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,BB,__,__,__], 
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at G4', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,BB,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at F3 is IN check from Black Bishop at G2', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,BB,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });
})

describe('isInCheck: false', () => {
    it('White King at F3 is NOT checked from PIECE at D5 with Black knight in the way', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,BB,__,__,__],
/*  E  */ [__,__,__,BN,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(false)
    });

    it('White King at F3 is NOT checked from PIECE at D5 with White knight in the way', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,BB,__,__,__],
/*  E  */ [__,__,__,WN,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(false)
    });
 
    it('White King at F3 is NOT checked from Black Bishop at D4', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,BB,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(false)
    });

    it('White King at F3 is NOT checked from Black Bishop at D3', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,BB,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,BK,__],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(false)
    });
});