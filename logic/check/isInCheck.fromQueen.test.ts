import isInCheck  from 'logic/check/isInCheck';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('isInCheck: true', () => {
    it('White King at f3 is IN check from Black Queen at e4', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,BQ,__,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at f3 is IN check from Black Queen at f4', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,__,BK],
/*  F  */ [__,__,WK,BQ,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(true)
    });

    it('White King at f3 is NOT in check from Black Queen at e5', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,BQ,__,__,BK],
/*  F  */ [__,__,WK,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__],
        ];

        expect(isInCheck(board, 'White')).toBe(false)
    });    

    it('White King at e1 is in check from Black Queen at e7', () => {
        const board: Board = [
    /*         1  2  3  4  5  6  7  8  */
    /*  A  */ [WR,WP,__,__,__,__,BP,BR],
    /*  B  */ [WN,__,__,WP,__,__,BP,BN],
    /*  C  */ [__,WP,__,WB,__,__,BP,BB],
    /*  D  */ [WQ,__,__,BP,__,__,BP,__],
    /*  E  */ [WK,__,__,__,__,__,BQ,BK],
    /*  F  */ [__,WP,BP,__,__,__,__,BB],
    /*  G  */ [__,WP,__,__,__,__,BP,BN],
    /*  H  */ [WR,WP,__,__,__,WB,BP,BR],
        ];  

        expect(isInCheck(board, 'White')).toBe(true)
    });    

});