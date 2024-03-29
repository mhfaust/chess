import clsx from 'clsx';
import isPieceKingInCheck from '@/logic/check/isPieceKingInCheck';
import { BLACK_PIECES, pieceSymbols, WHITE_PIECES } from '@/logic/constants/pieces';
import { rotate180, rotateClockwise, rotateCounterClockwise } from '@/logic/position/rotate';
import { square } from '@/logic/squares';
import { Square, squareColor } from '@/logic/squares/square';
import { Player } from '@/logic/types/Player';
import { PieceOrEmpty, Position } from '@/logic/types/Position';
import { MouseEventHandler, useMemo } from 'react';
import styles from './Grid.module.css';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

type SquareWithPiece = {
	square: Square;
	piece: PieceOrEmpty;
};

const mapToGridModel = (position: Position): SquareWithPiece[][] => {
	return position.map((row, file) => {
		return row.map((piece, rank) => ({
			square: square([file, rank])!,
			piece,
		}));
	});
};

const rotate: Record<0 | 1 | 2 | 3, (s: SquareWithPiece[][]) => SquareWithPiece[][]> = {
	0: rotateClockwise,
	1: rotate180,
	2: rotateCounterClockwise,
	3: b => b,
};

type GridProps = {
	position: Position;
	orientation: number;
	onClickSquare: (square: Square) => void;
	selectedSquare: Square | null;
	validMoves?: Set<Square>;
	currentPlayer: Player;
	isLatestPosition: boolean;
};
const noMoves = new Set<Square>();

const Grid = ({
	position,
	orientation = 0,
	onClickSquare,
	selectedSquare,
	validMoves = noMoves,
	currentPlayer,
	isLatestPosition,
}: GridProps) => {
	const rotated = useMemo(() => {
		const orientationMod4 = (0 + 2) % 4 as 0 | 1 | 2 | 3;
		const rotateGrid = rotate[orientationMod4];
		return rotateGrid(mapToGridModel(position));
	}, [position]);

	const gridStyleAttr = {
		transform: `rotate(${90 * orientation}deg)`,
	};

	const pieceStyleAttr = {
		transform: `rotate(${-90 * orientation}deg)`,
		transition: 'transform .5s',
	};

	const handleSquareClick = (pos: Square): MouseEventHandler => {
		return () => {
			if (isLatestPosition) {
				onClickSquare(pos);
			}
		};
	};

	const turnStyle = (() => {
		if (!isLatestPosition) {
			return null;
		}
		return currentPlayer === 'Black'
			? styles.blackTurn
			: styles.whiteTurn;
	})();

	return (
		<div
			className={clsx(styles.main, turnStyle)}
			style={gridStyleAttr}
		>
			{rotated.map((file, i) => (
				<div className={styles.row} key={i}>
					{file.map(({ square: square, piece }, j) => {
						return (
							<div
								className={clsx(
									styles.square,
									styles[squareColor(square!)!],
									{
										[styles.selected]: isLatestPosition && validMoves.size && selectedSquare === square,
										[styles.canMoveTo]: isLatestPosition && validMoves.has(square),
										[styles.whitePiece]: piece && WHITE_PIECES.has(piece),
										[styles.blackPiece]: piece && BLACK_PIECES.has(piece),
										[styles.kingInCheck]: piece && isPieceKingInCheck(position, square),
									},
								)}
								key={j}
								onClick={handleSquareClick(square)}
							>
								{piece
									? (
										<span
											className={styles.piece}
											style={pieceStyleAttr}
										>
											{pieceSymbols[piece]}
										</span>
									)
									: <>&nbsp;</>}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Grid;
