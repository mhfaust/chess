import queenMoves from './queenMoves';
import { BQ,BP,WK,WQ,WR,BK,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';
describe('queen', () => {

    it(`provides all possible moves from queen on queen1board: `, () => {

        const board: Board = [
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
        
        const expectedattackedPositions = new Set([
            'C3',
            'C1',
            'D2',
            'E2',
            'F2',
            'B2',
            'A2',
            'D3',
            'E4',
            'F5',
            'D1',
            'B1',
            'B3',
            'A4'
        ])

        const foundattackedPositions = queenMoves(board, 'C2');

        expect(foundattackedPositions).toEqual(expectedattackedPositions)
    });

    it('does not include moves putting self in check', () => {
        const board: Board = [
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
            'E2',
            'E3',
            'E5',
            'E6',
            'E7',
        ]);

        const foundLegalMoves = queenMoves(board, 'E4');

        expect(foundLegalMoves).toEqual(expectedLegalMoves)
    });

    
})