import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'rules/positions/pieces-shorthand';
import { Board }  from 'rules/types/Board';

export default (): Board => [
/*         1  2  3  4  5  6  7  8  */
/*  A  */ [WR,WP,__,__,__,__,BP,BR],
/*  B  */ [WN,WP,__,__,__,__,BP,BN],
/*  C  */ [WB,WP,__,__,__,__,BP,BB],
/*  D  */ [WQ,WP,__,__,__,__,BP,BQ],
/*  E  */ [WK,WP,__,__,__,__,BP,BK],
/*  F  */ [WB,WP,__,__,__,__,BP,BB],
/*  G  */ [WN,WP,__,__,__,__,BP,BN],
/*  H  */ [WR,WP,__,__,__,__,BP,BR],
];