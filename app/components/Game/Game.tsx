'use client'

import Grid from 'app/components/Grid/Grid';
import Captures from 'app/components/Captures';
import allPieceMoves from 'logic/moves/allPieceMoves';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { useGameStore } from 'app/utils/useGameStore';
import { currentBoard } from 'logic/game/selectors/boards';
import { currentCastling } from 'logic/game/selectors/castling';
import currentEnPassantSquare from 'logic/game/selectors/enPassant';
import currentPlayer from 'logic/game/selectors/players';
import { currentBlackCaptures, currentWhiteCaptures } from 'logic/game/selectors/captures';
import HistoryNav from '../HistoryNav';
import { isViewingLatestMove } from 'logic/game/selectors/game';
import CompassRotator from '../Rotator/Rotator';
import numWithOrdSuffix from 'app/utils/numWithOrdSuffix';
import styles from './Game.module.css';
import GameStatus from '../GameStatus';
import useDeviceOrientation from 'app/utils/useDeviceOrienation';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const { toggleSquare } = useGameStore().actions;
  const selectedSquare = useGameStore(game => game.selectedSquare);
  const orientation = useGameStore(game => game.orientation);
  const precludedCastling = useGameStore(currentCastling);
  const epSquare = useGameStore(currentEnPassantSquare);
  const thisPlayer = useGameStore(currentPlayer);
  const whiteCaptures = useGameStore(currentWhiteCaptures);
  const blackCaptures = useGameStore(currentBlackCaptures);
  const isLatestBoard = useGameStore(isViewingLatestMove);
  const thisBoard = useGameStore(currentBoard);
  const onPromotePawn = useGameStore(game => game.onPromotePawn);

  const isFlat = useDeviceOrientation(20);
  
  if(!thisBoard){
    return null;
  }

  const validMoves = selectedSquare 
    && allPieceMoves(
      thisBoard, 
      selectedSquare, 
      precludedCastling, 
      epSquare 
    ) || undefined;

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
