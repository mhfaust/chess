
import styles from './Grid.module.css'
import { BLACK_PIECES, unicodeSymbols, WHITE_PIECES }  from 'rules/constants/pieces';
import { positionName } from 'rules/positions';
import { Board, PieceOrEmpty } from 'rules/types/Board';
import { MouseEventHandler, useMemo } from 'react';
import clsx from 'clsx';
import { PositionName, squareColor } from 'rules/positions/positionName';
import { rotate8by8 } from 'rules/board/rotateCounterClockwise';
import { Player } from 'rules/types/Player';

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
  validMoves?: Set<PositionName>;
  currentPlayer: Player;
}
const noMoves = new Set<PositionName>();

const ChessBoard = ({ 
  board, 
  orientation = 0, 
  onClickSquare,
  selectedSquare,
  validMoves = noMoves,
  currentPlayer,
 }: ChessBoardProps) => {

  const rotated = useMemo(() => {
    return rotate[orientation](mapToPresentationModel(board))
  }, [board, orientation])

  const handleSquareClick = (pos: PositionName): MouseEventHandler => {
    return () => onClickSquare(pos);
  };

  const turnStyle = currentPlayer === 'Black' ? styles.blackTurn : styles.whiteTurn;

  return (
    <div className={clsx(styles.main, turnStyle)}>
      {rotated.map((file, i) => (
        <div className={styles.row} key={i}>
           {file.map(({ positionName, piece }, j) => {
             return (
               <div 
                 className={clsx(
                  styles.square, 
                  styles[squareColor(positionName!)!],
                  { 
                    [styles.selected]: selectedSquare === positionName,
                    [styles.canMoveTo]: validMoves.has(positionName),
                    [styles.whitePiece]: piece && WHITE_PIECES.has(piece),
                    [styles.blackPiece]: piece && BLACK_PIECES.has(piece),
                  },
                )} 
                 key={j}
                 onClick={handleSquareClick(positionName)}
               >
                 {(piece && (
                  <span className={styles.piece} >{unicodeSymbols[piece]}</span>
                  )) ?? <>&nbsp;</>}
               </div> 
             )
           })}
        </div>
      ))}
  </div>
  )
}

export default ChessBoard;