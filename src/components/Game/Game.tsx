'use client';

import Captures from '@/components/Captures/Captures';
import GameStatus from '@/components/GameStatus';
import Grid from '@/components/Grid/Grid';
import HistoryNav from '@/components/HistoryNav';
import Rotator from '@/components/Rotator/Rotator';
import useDeviceOrientation from '@/utils/useDeviceOrienation';
import clsx from 'clsx';
import { currentBlackCaptures, currentWhiteCaptures } from '@/logic/game/selectors/captures';
import { isViewingLatestPosition } from '@/logic/game/selectors/game';
import currentPlayer from '@/logic/game/selectors/players';
import { currentPosition } from '@/logic/game/selectors/positions';
import { currentValidMoves } from '@/logic/game/selectors/validMoves';
import { useEffect, useState } from 'react';
import { GameContainerProps } from '../GameContainer/GameContainer';
import { useGameStore } from '../GameContainer/useGameStore';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import styles from './Game.module.css';

type GameProps = {
	className?: string;
} & Pick<GameContainerProps, 'initialGamePlay' | 'initialPosition'>;

export default function Game({
	initialGamePlay,
	initialPosition,
	className,
}: GameProps) {
	const { toggleSquare, init, togglePosition } = useGameStore(game => game.actions);

	const [readyToRender, setReadyToRender] = useState(!initialGamePlay && !initialPosition);

	useEffect(() => {
		const numPositions = initialGamePlay?.length
			? initialGamePlay.split(',').length
			: 0;
		const pos = initialPosition === 'last' ? numPositions : 0;

		init(initialGamePlay!, pos);
		setReadyToRender(true);
	}, [init, initialGamePlay, initialPosition]);

	const selectedSquare = useGameStore(game => game.selectedSquare);
	const orientation = useGameStore(game => game.orientation);
	const onPromotePawn = useGameStore(game => game.onPromotePawn);
	const thisPlayer = useGameStore(currentPlayer);
	const whiteCaptures = useGameStore(currentWhiteCaptures);
	const blackCaptures = useGameStore(currentBlackCaptures);
	const isLatestPosition = useGameStore(isViewingLatestPosition);
	const thisPosition = useGameStore(currentPosition);
	const validMoves = useGameStore(currentValidMoves);

	const isFlat = useDeviceOrientation(20);

	if (!thisPosition || !readyToRender) {
		return null;
	}

	return (
		<>
			<div className={clsx(styles.game, className)}>
				<Grid
					position={thisPosition}
					orientation={orientation}
					onClickSquare={toggleSquare}
					selectedSquare={selectedSquare}
					validMoves={validMoves}
					currentPlayer={thisPlayer}
					isLatestPosition={isLatestPosition}
				/>
				<div className={styles.tray}>
					<Captures captures={whiteCaptures} player='white' />
					<Rotator />
					<Captures captures={blackCaptures} player='black' />
				</div>
				{
					/* <div>
        Device is flat: {isFlat === true ? 'TRUE' : isFlat === false ? 'FALSE' : 'UNKOWN'}
      </div> */
				}
				<GameStatus />
				<PawnPromotionPrompt onSelectPiece={onPromotePawn} />
			</div>
			<HistoryNav />
		</>
	);
}
