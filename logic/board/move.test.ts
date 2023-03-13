import move  from 'logic/board/move';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/positions/pieces-shorthand';
import { Board }  from 'logic/types/Board';

describe('move', () => {

    it('is in checkmate (1)', () => {
        const boardBefore: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,WP,BP,BR],
/*  G  */ [__,__,__,__,__,BP,BQ,BK],
/*  H  */ [__,__,__,__,__,__,BP,__],
        ];

        const boardAfter: Board = [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [__,__,__,__,__,__,__,__],
/*  B  */ [__,__,__,__,__,__,__,__],
/*  C  */ [__,__,__,__,__,__,__,__],
/*  D  */ [__,__,__,__,__,__,__,__],
/*  E  */ [__,__,__,__,__,__,__,__],
/*  F  */ [__,__,__,__,__,WP,BP,BR],
/*  G  */ [__,__,__,__,__,BP,BQ,__],
/*  H  */ [__,__,__,__,__,__,BP,BK],
        ];   
        
        const [nextBoard] = move(boardBefore, 'G8', 'H8', null);

        expect(nextBoard).toEqual(boardAfter)
    })
})