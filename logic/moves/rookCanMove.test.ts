import rookCanMove  from 'logic/moves/rookCanMove';
import { WK,BK,BR,BP,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Board';

const rook1Board: Position = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,BP,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [WK,WP,__,BR,__,__,__,BK],
/*  F  */ [__,__,__,__,__,__,__,__],
/*  G  */ [__,__,__,__,__,__,__,__],
/*  H  */ [__,__,__,WP,__,__,__,__],
];

describe('rookCanMove', () => {

    it('cannot move to its current square', () => {


        expect(rookCanMove(rook1Board, 'e4', 'e4')).toBe(false);
    });

    describe('along rank', () => {
        it('cannot pass over opponent piece: (e4 -> e1)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e1')).toBe(false);
        });

        it('can capture: (e4 -> e2)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e2')).toBe(true);
        });

        it('can: (e4 -> e3)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e3')).toBe(true);
        });

        it('can: (e4 -> e5)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e5')).toBe(true);
        });

        it('can : (e4 -> e6)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e6')).toBe(true);
        });
    
        it('can move along rank  (e4 -> e7)', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e7')).toBe(true);
        });
    
        it('cannot move onto own players piece', () => {
            expect(rookCanMove(rook1Board, 'e4', 'e8')).toBe(false);
        })

        it('cannot move diagonally', () => {
            expect(rookCanMove(rook1Board, 'e4', 'd5')).toBe(false);
        })
    })

    describe('along file', () => {

    })
    
})