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
import { captures } from 'logic/game/selectors/captures';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const game = useGameStore();
  const { selectedSquare, toggleSquare, makeNextMove } = game;
  const thisBoard = currentBoard(game)

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
      currentCastling(game), 
      currentEnPassantSquare(game) 
    ) || undefined;

  const handleClickSquare = (targetSquare: Square) => {
    const playerAtClicked = playerAt(thisBoard, targetSquare);

    //clicking the already-selected square (de-select):
    if (selectedSquare && selectedSquare === targetSquare){
      return toggleSquare(null);
    }
    //clicking one's own piece (select):
    else if (currentPlayer(game) === playerAtClicked) {
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
      currentCastling(game),
      currentEnPassantSquare(game),
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
      <Captures captures={captures(game).black} />
      <Grid 
        board={thisBoard} 
        orientation={0}
        onClickSquare={handleClickSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        currentPlayer={currentPlayer(game)}
      />
      <Captures captures={captures(game).white} />
      <div>
      {isCheckmate(thisBoard, currentPlayer(game)) ? (
          <div>
            <div>CHECKMATE -- {otherPlayer(currentPlayer(game))} WINS</div>
            <button>New Game</button>
          </div>
        ) : (<>
            <div>{currentPlayer(game)}&apos; turn</div>
            {isInCheck(thisBoard, currentPlayer(game)) ? (
              <div>
                <>{currentPlayer} is in check</>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
    <PawnPromotionPrompt onPromote={handlePromotePawn} />
  </>)
}
