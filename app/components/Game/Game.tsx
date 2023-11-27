'use client'

import Grid from 'app/components/Grid/Grid';
import Captures from 'app/components/Captures';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { currentPosition } from 'logic/game/selectors/positions';
import currentPlayer from 'logic/game/selectors/players';
import { currentBlackCaptures, currentWhiteCaptures } from 'logic/game/selectors/captures';
import HistoryNav from 'app/components/HistoryNav';
import { isViewingLatestPosition } from 'logic/game/selectors/game';
import Rotator from 'app/components/Rotator/Rotator';
import styles from './Game.module.css';
import GameStatus from 'app/components/GameStatus';
import useDeviceOrientation from 'app/utils/useDeviceOrienation';
import { currentValidMoves } from 'logic/game/selectors/validMoves';
import { useGameStore } from '../GameContainer/useGameStore';
import { GameContainerProps } from '../GameContainer/GameContainer';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type GameProps = {
  className?: string,
} & Pick<GameContainerProps, 'initialGamePlay' | 'initialPosition'>

export default function Game({ 
  initialGamePlay, 
  initialPosition,
  className,
}: GameProps) {

  const { toggleSquare, init, togglePosition } = useGameStore(game => game.actions);

  const [readyToRender, setReadyToRender] = useState(!initialGamePlay && !initialPosition);
  
  useEffect(() => {
    const numPositions = initialGamePlay?.split(',').length ?? 0;
    const pos = initialPosition === 'last' ? numPositions : 0;
    init(initialGamePlay!, pos);
    setReadyToRender(true);
  }, [init, initialGamePlay, initialPosition])
  
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

  if(!thisPosition || !readyToRender){
    return null;
  }

  return (<>
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
        <Captures captures={blackCaptures} player='black'/>
      </div>
      {/* <div>
        Device is flat: {isFlat === true ? 'TRUE' : isFlat === false ? 'FALSE' : 'UNKOWN'}
      </div> */}
      <GameStatus />
      <PawnPromotionPrompt onSelectPiece={onPromotePawn} />
    </div>
    <HistoryNav />
  </>)
}
