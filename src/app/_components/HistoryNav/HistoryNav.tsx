import clsx from 'clsx';
import { latestPositionCursor, positionCursor, positionIndexes } from '@/logic/game/selectors/positions';
import { useCallback, useEffect } from 'react';
import { useGameStore } from '../GameContainer/useGameStore';
import styles from './HistoryNav.module.css';

const HistoryNav = () => {
	const { togglePosition } = useGameStore(game => game.actions);
	const currentPositionIndex = useGameStore(positionCursor);
	const indexes = useGameStore(positionIndexes);
	const latestPositionIndex = useGameStore(latestPositionCursor);

	const onBodyClick = useCallback((e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft': {
				togglePosition(Math.max(currentPositionIndex - 1, 0));
				break;
			}
			case 'ArrowRight': {
				togglePosition(Math.min(currentPositionIndex + 1, latestPositionIndex));
				break;
			}
			default: {
				break;
			}
		}
	}, [currentPositionIndex, latestPositionIndex, togglePosition]);

	useEffect(() => {
		window.addEventListener('keyup', onBodyClick);
		return () => {
			window.removeEventListener('keyup', onBodyClick);
		};
	}, [onBodyClick]);

	return (
		<div className={styles.historyNav}>
			{indexes.map((i) => (
				<div
					key={i}
					onClick={() => togglePosition(i)}
					className={clsx(styles.boardIndex, {
						[styles.currentIndex]: i === currentPositionIndex,
					})}
				>
					{i}
				</div>
			))}
		</div>
	);
};

export default HistoryNav;
