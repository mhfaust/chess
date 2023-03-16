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
  const { selectedSquare, toggleSelectedSquare, makeNextMove } = game;
  const thisBoard = currentBoard(game)
  currentPlayer

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

  const handleClickSquare = (clickedSquare: Square) => {
    const playerAtClicked = playerAt(thisBoard, clickedSquare);

    if (selectedSquare && selectedSquare === clickedSquare){
      return toggleSelectedSquare(null);
    }

    else if (currentPlayer(game) === playerAtClicked) {
      return toggleSelectedSquare(clickedSquare)
    }
    
    else if (!selectedSquare){
      return toggleSelectedSquare(null)
    }

    else if (canMoveTo(
      thisBoard, 
      selectedSquare, 
      clickedSquare,
      currentCastling(game),
      currentEnPassantSquare(game),
    )) {

      if (isPromotingPawn(thisBoard, selectedSquare, clickedSquare)) {
        setHandlePromotePawn(() => (promotePawnAs: Piece) => {
            makeNextMove(selectedSquare, clickedSquare, promotePawnAs);
            setHandlePromotePawn(null);
        })
      }
      else {
        makeNextMove(selectedSquare, clickedSquare);
      }
      return toggleSelectedSquare(null)
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
