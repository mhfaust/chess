import rookCanMove  from 'rules/moves/rookCanMove';
import { WK,BK,BR,BP,WP,__ }  from 'rules/positions/pieces-shorthand';
import { Board }  from 'rules/types/Board';

const rook1Board: Board = [
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

    it('cannot move to its current position', () => {


        expect(rookCanMove(rook1Board, 'E4', 'E4')).toBe(false);
    });

    describe('along rank', () => {
        it('cannot pass over opponent piece: (E4 -> E1)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E1')).toBe(false);
        });

        it('can capture: (E4 -> E2)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E2')).toBe(true);
        });

        it('can: (E4 -> E3)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E3')).toBe(true);
        });

        it('can: (E4 -> E5)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E5')).toBe(true);
        });

        it('can : (E4 -> E6)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E6')).toBe(true);
        });
    
        it('can move along rank  (E4 -> E7)', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E7')).toBe(true);
        });
    
        it('cannot move onto own players piece', () => {
            expect(rookCanMove(rook1Board, 'E4', 'E8')).toBe(false);
        })
    })

    describe('along file', () => {

    })
    
})