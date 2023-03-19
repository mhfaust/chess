
import styles from './Grid.module.css'
import { BLACK_PIECES, unicodeSymbols, WHITE_PIECES }  from 'logic/constants/pieces';
import { square } from 'logic/squares';
import { Board, PieceOrEmpty } from 'logic/types/Board';
import { MouseEventHandler, useMemo } from 'react';
import clsx from 'clsx';
import { Square, squareColor } from 'logic/squares/square';
import { rotate8by8 } from 'logic/board/rotateCounterClockwise';
import { Player } from 'logic/types/Player';
import isPieceKingInCheck from 'logic/check/isPieceKingInCheck';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */


type Orientation = 0 | 1 | 2 | 3;


type SquareWithPiece = { 
  square: Square, 
  piece: PieceOrEmpty 
}

const mapToPresentationModel = (board: Board): SquareWithPiece[][] => {
  return  board.map((row, file) => {
    return row.map((piece, rank) => ({
      square: square([file, rank])!,
      piece
    }))
  })
}

const quaterCounterClockwise = rotate8by8<SquareWithPiece>;
const halfTurn = (s: SquareWithPiece[][]) => rotate8by8(rotate8by8(s));
const quarterClockwise = (s: SquareWithPiece[][]) => rotate8by8(rotate8by8(rotate8by8(s)));
const noTurn = (s: SquareWithPiece[][]) => s

const rotate: Record<Orientation, (s: SquareWithPiece[][]) => SquareWithPiece[][]> = {
  0: quaterCounterClockwise,
  1: halfTurn,
  2: quarterClockwise,
  3: noTurn,
}

type GridProps = {
  board: Board;
  orientation: Orientation;
  onClickSquare: (square: Square) => void;
  selectedSquare: Square | null;
  validMoves?: Set<Square>;
  currentPlayer: Player;
  isLatestBoard: boolean;
}
const noMoves = new Set<Square>();

const Grid = ({ 
  board, 
  orientation = 0, 
  onClickSquare,
  selectedSquare,
  validMoves = noMoves,
  currentPlayer,
  isLatestBoard
 }: GridProps) => {

  const rotated = useMemo(() => {
    return rotate[orientation](mapToPresentationModel(board))
  }, [board, orientation])

  const handleSquareClick = (pos: Square): MouseEventHandler => {
    return () => {
      if (isLatestBoard) {
        onClickSquare(pos)};
      } 
  };

  const turnStyle = (() => {
    if (!isLatestBoard) {
      return null
    }
    return currentPlayer === 'Black' 
      ? styles.blackTurn 
      : styles.whiteTurn;
  })();
  
  return (
    <div className={clsx(styles.main, turnStyle)}>
      {rotated.map((file, i) => (
        <div className={styles.row} key={i}>
           {file.map(({ square: square, piece }, j) => {
             return (
               <div 
                 className={clsx(
                  styles.square, 
                  styles[squareColor(square!)!],
                  { 
                    [styles.selected]: isLatestBoard && selectedSquare === square,
                    [styles.canMoveTo]: isLatestBoard && validMoves.has(square),
                    [styles.whitePiece]: piece && WHITE_PIECES.has(piece),
                    [styles.blackPiece]: piece && BLACK_PIECES.has(piece),
                    [styles.kingInCheck]: piece && isPieceKingInCheck(board, square),
                  },
                )} 
                 key={j}
                 onClick={handleSquareClick(square)}
               >
                 {piece ? (
                  <span className={styles.piece} >{unicodeSymbols[piece]}</span>
                  ) : <>&nbsp;</>}
               </div> 
             )
           })}
        </div>
      ))}
  </div>
  )
}

export default Grid;