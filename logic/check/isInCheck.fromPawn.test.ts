import isInCheck  from 'logic/check/isInCheck';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';

describe('isInCheck: true', () => {
    it('White King at e1 is in check from Black Pawn at d2', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,BP,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(position, 'White')).toBe(true)
    });

    it('White King at e1 is in check from Black Pawn at f2', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,BK],
/*  F  */ [__,BP,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];
    })
})

describe('isInCheck: false', () => {
    it('White King at e3 is NOT check from Pawn at e4', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,WK,BP,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e3 is NOT check from Pawn at d3', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,BP,__,__,__,__,__],
/*  E  */ [__,__,WK,__,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e3 is NOT check from Pawn at d2', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,BP,__,__,__,__,__,__],
/*  E  */ [__,__,WK,__,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e3 is NOT check from Pawn at e2', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,BP,WK,__,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e3 is NOT check from Pawn at f2', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,WK,__,__,__,__,BK],
/*  F  */ [__,BP,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e3 is NOT check from Pawn at f3', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,WK,__,__,__,__,BK],
/*  F  */ [__,__,BP,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e5 is NOT check from Pawn at e7', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,WK,__,BP,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('White King at e5 is NOT in check from Pawn at c7', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,BP,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,WK,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isInCheck(position, 'White')).toBe(false)
    });

    it('Black King at g7 IS in check from Pawn at f6', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,WP,BP,BR],
/*  G  */ [__,__,__,__,__,BP,BK,__],
/*  H  */ [__,__,__,__,__,__,BP,__],
        ];

        expect(isInCheck(position, 'Black')).toBe(true)
    });

    it('start: e4 does not trigger isInCheck', () => {
        const position: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [WR,WP,__,__,__,__,BP,BR],
/*  B  */ [WN,WP,__,__,__,__,BP,BN],
/*  C  */ [WB,WP,__,__,__,__,BP,BB],
/*  D  */ [WQ,WP,__,__,__,__,BP,BQ],
/*  E  */ [WK,__,__,WP,__,__,BP,BK],
/*  F  */ [WB,WP,__,__,__,__,BP,BB],
/*  G  */ [WN,WP,__,__,__,__,BP,BN],
/*  H  */ [WR,WP,__,__,__,__,BP,BR],
        ];

        expect(isInCheck(position, 'Black')).toBe(false)
        expect(isInCheck(position, 'White')).toBe(false)
    });
})