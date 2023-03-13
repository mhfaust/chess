import rook from './rookMoves';
import { WK,BK,BR,BP,WP,WR,__ }  from 'rules/positions/pieces-shorthand';
import { Board }  from 'rules/types/Board';

describe('rook', () => {

    it(`provides all possible moves from rook on rook1board: `, () => {
        const board: Board = [
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

        const expectedLegalMoves = new Set([
            'D4',
            'C4',
            'E2',
            'E3',
            'E5',
            'E6',
            'E7',
            'F4',
            'G4',
            'H4'
        ]);

        const foundLegalMoves = rook(board, 'E4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves);
    })

    it('does not include moves putting self in check', () => {
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,BP,__,__,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,WR,__,BR,__,__,__,BK],
            /*  F  */ [__,__,__,__,__,__,__,__],
            /*  G  */ [__,__,__,__,__,__,__,__],
            /*  H  */ [__,__,__,WP,__,__,__,__],
            ];
        const expectedLegalMoves = new Set([
            'E2',
            'E3',
            'E5',
            'E6',
            'E7',
        ]);

        const foundLegalMoves = rook(board, 'E4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });
});