import queenMoves from './queenMoves';
import { BQ,BP,WK,WQ,WR,BK,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';
describe('queen', () => {

    it(`provides all possible moves from queen on queen1Position: `, () => {

        const position: Position = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,WQ,__,WK,__,__,BP,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,__,__,__,__,__,__,BK],
            /*  F  */ [__,__,__,__,BP,__,__,__],
            /*  G  */ [__,WR,__,__,__,__,__,__],
            /*  H  */ [__,__,__,__,__,__,__,__], 
            ];
        
        const expectedattackedSquares = new Set([
            'c3',
            'c1',
            'd2',
            'e2',
            'f2',
            'b2',
            'a2',
            'd3',
            'e4',
            'f5',
            'd1',
            'b1',
            'b3',
            'a4'
        ])

        const foundattackedSquares = queenMoves(position, 'c2');

        expect(foundattackedSquares).toEqual(expectedattackedSquares)
    });

    it('does not include moves putting self in check', () => {
        const position: Position = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,WP,__,__],
            /*  D  */ [__,__,__,__,__,__,__,__],
            /*  E  */ [WK,WR,__,BQ,__,__,__,BK],
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

        const foundLegalMoves = queenMoves(position, 'e4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });

    
})