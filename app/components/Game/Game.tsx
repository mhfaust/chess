'use client'

import Grid from 'app/components/Grid/Grid';
import { Square } from 'logic/squares/square';
import { canMoveTo } from 'logic/moves';
import { otherPlayer, playerAt } from 'logic/squares';
import Captures from 'app/components/Captures';
import allPieceMoves from 'logic/moves/allPieceMoves';
import isPromotingPawn from 'logic/board/pawnPromotionOptions';
import { Piece } from 'logic/squares/piece';
import { useState } from 'react';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { useGameStore } from 'logic/game/useGameStore';
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

  const { toggleSquare, makeNextMove } = useGameStore().actions;
  const selectedSquare = useGameStore(game => game.selectedSquare);
  const orientation = useGameStore(game => game.orientation);
  const precludedCastling = useGameStore(currentCastling);
  const epSquare = useGameStore(currentEnPassantSquare);
  const thisPlayer = useGameStore(currentPlayer);
  const whiteCaptures = useGameStore(currentWhiteCaptures);
  const blackCaptures = useGameStore(currentBlackCaptures);
  const isLatestBoard = useGameStore(isViewingLatestMove);
  const thisBoard = useGameStore(currentBoard);
  const cursor = useGameStore(game => game.boardCursor);

  const isFlat = useDeviceOrientation();


  const [handlePromotePawn, setHandlePromotePawn] = useState<
    ((p: Piece ) => void) | null
  >(null);
  
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

  const handleClickSquare = (targetSquare: Square) => {
    const playerAtClicked = playerAt(thisBoard, targetSquare);

    //clicking the already-selected square (de-select):
    if (selectedSquare && selectedSquare === targetSquare){
      return toggleSquare(null);
    }
    //clicking one's own piece (select):
    else if (thisPlayer === playerAtClicked) {
      return toggleSquare(targetSquare)
    }
    //No selection before click, but clicking some other square (they can't):
    else if (!selectedSquare){
      return toggleSquare(null)
    }

    //There's already a selection, and they're clicking another square, 
    //so it's a move attempt. If it's a legit move, do it (unless pawn promo):
    else if (canMoveTo(
      thisBoard, 
      selectedSquare, 
      targetSquare,
      precludedCastling,
      epSquare,
    )) {
      //If it's a pawn promotion, we don't do the move yet  because 
      //we need to prompt them for which piece to promote to:
      if (isPromotingPawn(thisBoard, selectedSquare, targetSquare)) {
        setHandlePromotePawn(() => (promotePawnAs: Piece) => {
            makeNextMove(selectedSquare, targetSquare, promotePawnAs);
            setHandlePromotePawn(null);
        })
      }
      else {
        makeNextMove(selectedSquare, targetSquare);
      }
      return toggleSquare(null)
    } 
    
    return;
  }

  const ordinal = cursor === 0
    ? 'initially'
    : `after the ${numWithOrdSuffix(cursor)} move`

  const historicBoardNote = `This is what the board looked like ${ordinal}`

  return (<>
    <div className={styles.game}>
      <Grid 
        board={thisBoard} 
        orientation={orientation}
        onClickSquare={handleClickSquare}
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
      <PawnPromotionPrompt onPromote={handlePromotePawn} />
    </div>
    <HistoryNav />

  </>)
}
