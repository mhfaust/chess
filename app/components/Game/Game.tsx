'use client'

import Grid from 'app/components/Grid/Grid';
import Captures from 'app/components/Captures';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { useGameStore } from 'app/utils/useGameStore';
import { currentBoard } from 'logic/game/selectors/boards';
import currentPlayer from 'logic/game/selectors/players';
import { currentBlackCaptures, currentWhiteCaptures } from 'logic/game/selectors/captures';
import HistoryNav from '../HistoryNav';
import { isViewingLatestMove } from 'logic/game/selectors/game';
import CompassRotator from '../Rotator/Rotator';
import styles from './Game.module.css';
import GameStatus from '../GameStatus';
import useDeviceOrientation from 'app/utils/useDeviceOrienation';
import { currentValidMoves } from 'logic/game/selectors/validMoves';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const { toggleSquare } = useGameStore().actions;
  const selectedSquare = useGameStore(game => game.selectedSquare);
  const orientation = useGameStore(game => game.orientation);
  const thisPlayer = useGameStore(currentPlayer);
  const whiteCaptures = useGameStore(currentWhiteCaptures);
  const blackCaptures = useGameStore(currentBlackCaptures);
  const isLatestBoard = useGameStore(isViewingLatestMove);
  const thisBoard = useGameStore(currentBoard);
  const onPromotePawn = useGameStore(game => game.onPromotePawn);
  const validMoves = useGameStore(currentValidMoves)

  const isFlat = useDeviceOrientation(20);
  
  if(!thisBoard){
    return null;
  }

  return (<>
    <div className={styles.game}>
      <Grid 
        board={thisBoard} 
        orientation={orientation}
        onClickSquare={toggleSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        currentPlayer={thisPlayer}
        isLatestBoard={isLatestBoard}
      />
      <div className={styles.tray}>
        <Captures captures={whiteCaptures} player='white' />
        <CompassRotator />
        <Captures captures={blackCaptures} player='black'/>
      </div>
      <div>
        Device is flat: {isFlat === true ? 'TRUE' : isFlat === false ? 'FALSE' : 'UNKOWN'}
      </div>
      <GameStatus />
      <PawnPromotionPrompt onSelectPiece={onPromotePawn} />
    </div>
    <HistoryNav />
  </>)
}
