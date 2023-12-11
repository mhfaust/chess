import { pieceSymbols } from 'logic/constants/pieces';
import currentPlayer from 'logic/game/selectors/players';
import { blackPromotionOptions, whitePromotionOptions } from 'logic/position/pawnPromotionOptions';
import { Piece } from 'logic/squares/piece';
import { useGameStore } from '../GameContainer/useGameStore';
import styles from './PawnPromotionPrompt.module.css';

export type PawnPromotionOptionsProps = {
	onSelectPiece: ((selection: Piece) => void) | null;
};

const PawnPromotionOptions = ({ onSelectPiece }: PawnPromotionOptionsProps) => {
	const thisPlayer = useGameStore(currentPlayer);

	if (!onSelectPiece) {
		return null;
	}

	const options = thisPlayer === 'White'
		? whitePromotionOptions
		: blackPromotionOptions;

	return (
		<div className={styles.screen}>
			<div className={styles.main}>
				Promote pawn as:<br />
				{options.map(option => (
					<div
						key={option}
						onClick={() => onSelectPiece(option)}
						className={styles.option}
					>
						{pieceSymbols[option]}&nbsp;{option.substring(6)}
					</div>
				))}
			</div>
		</div>
	);
};

export default PawnPromotionOptions;
