import knightCanMove  from 'logic/moves/knightCanMove'
import { initialBoard }  from 'logic/board'
import { __, WK, WN, BK, BQ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('knightCanMove', () => {


    it('reports true attempting to move to empty square, 2 forward, 1 left.', () => {

        const answer = knightCanMove(initialBoard(), 'B1', 'A3')
        expect(answer).toBe(true);
    });

    it('reports true attempting to move to empty square, 2 forward, 1 right.', () => {
       

        const answer = knightCanMove(initialBoard(), 'B1', 'C3')
        expect(answer).toBe(true);
    });

    it('reports false attempting to move to square occupied by own players piece.', () => {
        
        const answer = knightCanMove(initialBoard(), 'B1', 'C2')
        expect(answer).toBe(false);
    });

    it('reports false attempting to move to mechanically disallowed square', () => {

        const answer = knightCanMove(initialBoard(), 'B1', 'B4')
        expect(answer).toBe(false);
    });

    it('cannot move pinned knight',() =>{
        const board: Board = [
            /*         1  2  3  4  5  6  7  8  */
            /*  A  */ [__,__,__,__,__,__,__,__],
            /*  B  */ [__,__,__,__,__,__,__,__],
            /*  C  */ [__,__,__,__,__,__,__,__],
            /*  D  */ [__,__,__,__,__,__,__,BK],
            /*  E  */ [WK,__,__,WN,__,__,__,BQ],
            /*  F  */ [__,__,__,__,__,__,__,__],
            /*  G  */ [__,__,__,__,__,__,__,__],
            /*  H  */ [__,__,__,__,__,__,__,__], 
        ];

        const answer = knightCanMove(board, 'E4', 'C3')
        expect(answer).toBe(false);

    })
})