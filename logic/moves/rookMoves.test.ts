import rook from './rookMoves';
import { WK,BK,BR,BP,WP,WR,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';

describe('rook', () => {

    it(`provides all possible moves from rook on rook1board: `, () => {
        const position: Position = [
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
            'd4',
            'c4',
            'e2',
            'e3',
            'e5',
            'e6',
            'e7',
            'f4',
            'g4',
            'h4'
        ]);

        const foundLegalMoves = rook(position, 'e4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves);
    })

    it('does not include moves putting self in check', () => {
        const position: Position = [
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
            'e2',
            'e3',
            'e5',
            'e6',
            'e7',
        ]);

        const foundLegalMoves = rook(position, 'e4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });
});