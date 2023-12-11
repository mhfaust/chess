import { currentlyCheckmated, currentlyInCheck } from 'logic/game/selectors/check';
import currentPlayer from 'logic/game/selectors/players';
import { otherPlayer } from 'logic/squares';
import { useGameStore } from '../GameContainer/useGameStore';
import styles from './GameStatus.module.css';

const GameStatus = () => {
	const thisPlayer = useGameStore(currentPlayer);
	const inCheck = useGameStore(currentlyInCheck);
	const checkmated = useGameStore(currentlyCheckmated);

	return (
		<div className={styles.gameStatus}>
			{checkmated
				? (
					<div>
						<div>CHECKMATE -- {otherPlayer(thisPlayer)} WINS</div>
						<button>New Game</button>
					</div>
				)
				: inCheck && (
					<div>
						<>{thisPlayer} is in check</>
					</div>
				)}
		</div>
	);
};

export default GameStatus;
