import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import canMoveTo  from 'logic/moves/canMoveTo';
import { Board }  from 'logic/types/Board';
import { RookStartPosition } from 'logic/types/CastlingPreclusions';

describe('canMoveTo (Bishop)', () => {
    
    it('Can move bishop only along axis of potential check while blocking check', () => {
        const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WK,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,WB,__,__,__,__],
        /*  E  */ [__,__,__,__,__,__,__,BK],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,BB,__],
        /*  H  */ [__,__,__,__,__,__,__,BR],
        ];

        expect(canMoveTo(board, 'd4', 'c3', new Set(), null)).toBe(true);  
        expect(canMoveTo(board, 'd4', 'c5', new Set(), null)).toBe(false);  
    });
});


describe('canMoveTo (King)', () => {

    const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [WR,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,__,__,__,__,__,__,__],
        /*  D  */ [__,__,__,__,__,__,__,BK],
        /*  E  */ [WK,__,__,__,__,__,__,__],
        /*  F  */ [__,__,__,__,__,__,__,__],
        /*  G  */ [__,__,__,__,__,__,__,BR],
        /*  H  */ [WR,__,__,__,__,__,__,__], 
        ];

        expect(canMoveTo(board, 'e1', 'g1', new Set<RookStartPosition>(['h8', 'a8']))).toBe(false)
    
});


describe('canMoveTo Knight', () => {

    
});


describe('canMoveTo (Pawn)', () => {

    it('black pawn can attack a square passed by a white pawn moving from rank 2 to 4', () => {
        const board : Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [WR,WP,__,__,__,__,BP,BR],
            /*  B  */ [WN,WP,__,__,__,__,BP,BN],
            /*  C  */ [WB,WP,__,__,__,__,BP,BB],
            /*  D  */ [WQ,WP,__,BP,__,__,__,BQ],
            /*  E  */ [WK,__,__,WP,__,__,BP,BK],
            /*  F  */ [WB,WP,__,__,__,__,BP,BB],
            /*  G  */ [WN,WP,__,__,BP,__,__,BN],
            /*  H  */ [WR,__,__,__,WP,__,BP,BR],
        ];
        
        const answer = canMoveTo(board, 'd4', 'e3', new Set(), 'e3');
        expect(answer).toBe(true);
    });
});


describe('canMoveTo (Queen)', () => {
    const board: Board = [
        /*         1  2  3  4  5  6  7  8  */
        /*  A  */ [__,__,__,__,__,__,__,__],
        /*  B  */ [__,__,__,__,__,__,__,__],
        /*  C  */ [__,WQ,__,WK,__,__,BP,__],
        /*  D  */ [__,__,__,__,__,__,__,__],
        /*  E  */ [__,__,__,__,__,__,__,BK],
        /*  F  */ [__,__,__,__,BP,__,__,__],
        /*  G  */ [__,WR,__,__,__,__,__,__],
        /*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        it('can capture opponent piece, diagonally', () => {
            expect(canMoveTo(board, 'c2', 'f5', new Set(), null)).toBe(true)
        });
    
});


describe('canMoveTo (Rook)', () => {

    
});