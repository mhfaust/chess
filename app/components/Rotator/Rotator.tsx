import clsx from 'clsx';
import currentPlayer from 'logic/game/selectors/players';
import { useGameStore } from '../GameContainer/useGameStore';
import styles from './Rotator.module.css';

const WhiteTriangle = () => {
	return (
		<svg viewBox='0 0 1 1.5' width='2em' height='3em'>
			<polygon
				points='0,1.5 0.5,0 1,1.5'
				fill='#fff'
				stroke='#000'
				strokeWidth='0.06'
			/>
		</svg>
	);
};

const BlackTriangle = () => {
	return (
		<svg viewBox='0 0 1 1.5' width='2em' height='3em'>
			<polygon
				points='0,0 0.5,1.5 1,0'
				fill='#000'
				stroke='#000'
				strokeWidth='0.06'
			/>
		</svg>
	);
};

const EchelonRotator = () => {
	const { rotateBoard } = useGameStore(game => game.actions);
	const orientation = useGameStore(game => game.orientation);
	const player = useGameStore(currentPlayer);

	const rotationStyle = {
		transform: `rotate(${90 * orientation}deg)`,
	};

	return (
		<span
			onClick={rotateBoard}
			className={clsx(styles.rotator)}
			style={rotationStyle}
			title={`${player}'s turn. Click here to rotate to board.`}
		>
			{player === 'Black' ? <BlackTriangle /> : <WhiteTriangle />}
		</span>
	);
};

export default EchelonRotator;
