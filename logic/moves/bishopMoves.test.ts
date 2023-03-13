import bishopMoves from './bishopMoves';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('bishop', () => {

    it(`provides all possible moves from bishop `, () => {

        const board: Board = [
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
            'E5',
            'F6',
            'G7',
            'E3',
            'F2',
            'G1',
            'C3',
            'B2',
            'A1',
            'C5'
        ]);

        const foundLegalMoves = bishopMoves(board, 'D4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    })

    it('does not include moves putting self in check', () => {
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
            
        const expecteLegalMoves = new Set([
            'E5',
            'F6',
            'G7',
            'C3',
            'B2',
        ]);


        const foundLegalMoves = bishopMoves(board, 'D4');

        expect(foundLegalMoves).toEqual(expecteLegalMoves)   
    })
})