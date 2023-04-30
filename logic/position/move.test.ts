import nextPosition  from 'logic/position/move';
import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position }  from 'logic/types/Position';

describe('move', () => {

    it('is in checkmate (1)', () => {
        const boardBefore: Position = [
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

        const boardAfter: Position = [
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
        
        const [next] = nextPosition(boardBefore, 'g8', 'h8', null);

        expect(next).toEqual(boardAfter)
    })
})