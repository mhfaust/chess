import { BK,BQ,BR,BN,BB,BP,WK,WQ,WR,WN,WB,WP,__ }  from 'logic/squares/pieces-shorthand';
import { Position, BoardFile }  from 'logic/types/Board';

const { freeze } = Object;

export const initialBoard: Position = Object.freeze([
  /*                 1  2  3  4  5  6  7  8  */
  /*  A  */ freeze([WR,WP,__,__,__,__,BP,BR]) as BoardFile,
  /*  B  */ freeze([WN,WP,__,__,__,__,BP,BN]) as BoardFile,
  /*  C  */ freeze([WB,WP,__,__,__,__,BP,BB]) as BoardFile,
  /*  D  */ freeze([WQ,WP,__,__,__,__,BP,BQ]) as BoardFile,
  /*  E  */ freeze([WK,WP,__,__,__,__,BP,BK]) as BoardFile,
  /*  F  */ freeze([WB,WP,__,__,__,__,BP,BB]) as BoardFile,
  /*  G  */ freeze([WN,WP,__,__,__,__,BP,BN]) as BoardFile,
  /*  H  */ freeze([WR,WP,__,__,__,__,BP,BR]) as BoardFile,
]) as Position;

