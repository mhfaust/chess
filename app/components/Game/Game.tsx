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
import { isCheckmate, isInCheck } from 'logic/check';
import { useGameStore } from 'logic/game/useGameStore';
import { currentBoard } from 'logic/game/selectors/boards';
import { currentCastling } from 'logic/game/selectors/castling';
import currentEnPassantSquare from 'logic/game/selectors/enPassant';
import currentPlayer from 'logic/game/selectors/players';
import { currentBlackCaptures, currentWhiteCaptures } from 'logic/game/selectors/captures';
import HistoryNav from '../HistoryNav';
import { isViewingLatestMove } from 'logic/game/selectors/game';
import RotateButtons from '../Rotator/Rotator';

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

  return (<>
    <div style={{ width: '600px'}}>
      <Captures captures={blackCaptures} />
      <Grid 
        board={thisBoard} 
        orientation={orientation}
        onClickSquare={handleClickSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        currentPlayer={thisPlayer}
        isLatestBoard={isLatestBoard}
      />
      <RotateButtons />
      <Captures captures={whiteCaptures} />
      <div>
      {isCheckmate(thisBoard, thisPlayer) ? (
          <div>
            <div>CHECKMATE -- {otherPlayer(thisPlayer)} WINS</div>
            <button>New Game</button>
          </div>
        ) : (<>
            <div>{thisPlayer}&apos; turn</div>
            {isInCheck(thisBoard, thisPlayer) && (
              <div>
                <>{thisPlayer} is in check</>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    <HistoryNav />
    <PawnPromotionPrompt onPromote={handlePromotePawn} />
  </>)
}
