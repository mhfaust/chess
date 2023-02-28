
import styles from './ChessBoard.module.css'
import { unicodeSymbols }  from 'rules/constants/pieces';
import { positionName } from 'rules/positions';
import { Board, PieceOrEmpty } from 'rules/types/Board';
import { MouseEventHandler, useMemo } from 'react';
import clsx from 'clsx';
import { PositionName, squareColor } from 'rules/positions/positionName';
import { rotate8by8 } from 'rules/board/rotateCounterClockwise';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */


type Orientation = 0 | 1 | 2 | 3;


type SquareModel = { 
  positionName: PositionName, 
  piece: PieceOrEmpty 
}

const mapToPresentationModel = (board: Board): SquareModel[][] => {
  return  board.map((row, file) => {
    return row.map((piece, rank) => ({
      positionName: positionName([file, rank])!,
      piece
    }))
  })
}

const quaterCounterClockwise = rotate8by8<SquareModel>;
const halfTurn = (s: SquareModel[][]) => rotate8by8(rotate8by8(s));
const quarterClockwise = (s: SquareModel[][]) => rotate8by8(rotate8by8(rotate8by8(s)));
const noTurn = (s: SquareModel[][]) => s

const rotate: Record<Orientation, (s: SquareModel[][]) => SquareModel[][]> = {
  0: quaterCounterClockwise,
  1: halfTurn,
  2: quarterClockwise,
  3: noTurn,
}

type ChessBoardProps = {
  board: Board;
  orientation: Orientation;
  onClickSquare: (PositionName: PositionName) => void;
  selectedSquare: PositionName | null;
}

const ChessBoard = ({ 
  board, 
  orientation = 0, 
  onClickSquare,
  selectedSquare
 }: ChessBoardProps) => {

  const rotated = useMemo(() => {
    return rotate[orientation](mapToPresentationModel(board))
  }, [board, orientation])

  const handleSquareClick = (pos: PositionName): MouseEventHandler => {
    return () => onClickSquare(pos);
  };

  return (
    <div className={styles.div}>
      {rotated.map((file, i) => (
        <div className={styles.file} key={i}>
           {file.map(({positionName, piece}, j) => {
             return (
               <div 
                 className={clsx(
                  styles.square, 
                  styles[squareColor(positionName!)!],
                  { [styles.selected]: selectedSquare === positionName },
                )} 
                 key={j}
                 id={positionName!}
                 onClick={handleSquareClick(positionName)}
               >
                 {(piece && unicodeSymbols[piece]) ?? ' '}
               </div> 
             )
           })}
        </div>
      ))}
  </div>
  )
}

export default ChessBoard;