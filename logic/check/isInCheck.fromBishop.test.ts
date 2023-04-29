import isInCheck  from 'logic/check/isInCheck';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';

describe('isInCheck: true', () => {
    it('White King at f3 is IN check from Black Bishop at e4', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at d5', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at a8', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at e2', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at h1', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at h5', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at g4', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Bishop at g2', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(true)
    });
})

describe('isInCheck: false', () => {
    it('White King at f3 is NOT checked from PIECE at d5 with Black knight in the way', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at f3 is NOT checked from PIECE at d5 with White knight in the way', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(false)
    });
 
    it('White King at f3 is NOT checked from Black Bishop at d4', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at f3 is NOT checked from Black Bishop at d3', () => {
        const position: Position = [
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

        expect(isInCheck(position, 'White')).toBe(false)
    });
});