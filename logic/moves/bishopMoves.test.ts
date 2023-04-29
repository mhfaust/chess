import bishopMoves from './bishopMoves';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';

describe('bishop', () => {

    it(`provides all possible moves from bishop `, () => {

        const position: Position = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,WP,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,WB,__,__,__,__],
            /*  E  */ [WK,__,__,__,__,__,__,BK],
            /*  F  */ [__,__,__,__,__,__,__,__],
            /*  G  */ [__,__,__,__,__,__,BP,__],
            /*  H  */ [__,__,__,__,__,__,__,BR],
            ];
        
        const expectedLegalMoves = new Set([
            'e5',
            'f6',
            'g7',
            'e3',
            'f2',
            'g1',
            'c3',
            'b2',
            'a1',
            'c5'
        ]);

        const foundLegalMoves = bishopMoves(position, 'd4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    })

    it('does not include moves putting self in check', () => {
        const position: Position = [
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
            
        const expecteLegalMoves = new Set([
            'e5',
            'f6',
            'g7',
            'c3',
            'b2',
        ]);


        const foundLegalMoves = bishopMoves(position, 'd4');

        expect(foundLegalMoves).toEqual(expecteLegalMoves)   
    })
})