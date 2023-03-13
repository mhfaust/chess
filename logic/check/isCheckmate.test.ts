import isCheckmate from './isCheckmate';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'rules/positions/pieces-shorthand';
import { Board }  from 'rules/types/Board';

describe('isCheckmate', () => {
   
    it('Black is Not in check --> not in checkmate', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,WP,BP,BR],
/*  G  */ [__,__,__,__,__,BP,__,BK],
/*  H  */ [__,__,__,__,__,WQ,BP,__],
        ];

        expect(isCheckmate(board, 'Black')).toBe(false)
    });

    it('Black is NOT in checkmate (king can move out of check)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,BP,BR],
/*  G  */ [__,__,__,__,__,__,BP,BK],
/*  H  */ [__,__,__,__,__,__,WB,__],
        ];

        expect(isCheckmate(board, 'Black')).toBe(false)
    });  

    it('Black is NOT in checkmate (king can take attacker)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,BP,BR],
/*  G  */ [__,__,__,__,__,__,BP,BK],
/*  H  */ [__,__,__,__,__,__,WB,__],
        ];

        expect(isCheckmate(board, 'Black')).toBe(false)
    });

    it('Black is in checkmate (1)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,WP,BP,BR],
/*  G  */ [__,__,__,__,__,BP,WQ,BK],
/*  H  */ [__,__,__,__,__,__,BP,__],
        ];

        expect(isCheckmate(board, 'Black')).toBe(true)
    });

    it('Black is in checkmate (2)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,WB,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,BP,BR],
/*  G  */ [__,__,__,__,__,__,BP,BK],
/*  H  */ [__,__,__,__,__,__,WQ,__],
        ];

        expect(isCheckmate(board, 'Black')).toBe(true)
    });    

    it('White is in checkmate (3)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,BP,__,__],
/*  B  */ [__,__,WP,__,BP,__,__,__],
/*  C  */ [__,__,__,__,__,BP,__,__],
/*  D  */ [__,__,__,WP,BP,__,__,__],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [WR,__,__,__,__,__,__,__],
/*  G  */ [WK,BR,__,WP,__,BP,__,BK],
/*  H  */ [__,BR,__,WP,__,WQ,BP,__],
        ];

        expect(isCheckmate(board, 'White')).toBe(true)
    });  
   
    it('White is in checkmate (4) -- double check!', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [BQ,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,WP,BN,__,__,__,__,__],
/*  D  */ [WK,WP,__,BR,__,__,__,BK],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        expect(isCheckmate(board, 'White')).toBe(true)
    });     
    
    it('White is in checkmate (5)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,BB,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,WP,__,__,__,__,__,__],
/*  D  */ [WK,WP,BN,__,__,__,__,BK],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,BQ,__,__,__], 
        ];

        expect(isCheckmate(board, 'White')).toBe(true)
    }); 

    it('White is NOT in checkmate - knight removed', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,BB,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,WP,__,__,__,__,__,__],
/*  D  */ [WK,WP,__,__,__,__,__,BK],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,__,BQ,__,__,__], 
        ];

        expect(isCheckmate(board, 'White')).toBe(false)
    });

    it('Black is in checkmate and pawn cannot attack empty square (H7-G6)', () => {
        const board: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [WR,WP,__,__,__,__,BP,BR],
/*  B  */ [WN,WP,__,__,__,__,BP,BN],
/*  C  */ [WB,WP,__,__,__,__,BP,BB],
/*  D  */ [__,__,WP,__,__,__,BP,BQ],
/*  E  */ [WK,__,__,WP,__,__,BP,BK],
/*  F  */ [WB,WP,__,__,BP,__,__,BB],
/*  G  */ [WN,WP,__,__,BP,__,__,BN],
/*  H  */ [WR,WP,__,__,WQ,__,BP,BR],
        ];

        expect(isCheckmate(board, 'Black')).toBe(true)
    });
})