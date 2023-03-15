'use client'

import Grid from 'app/components/Grid/Grid';
import { useOldGameStore } from 'app/components/Game/oldGameStore';
import { Square } from 'logic/positions/square';
import { canMoveTo } from 'logic/moves';
import { otherPlayer, playerAt } from 'logic/positions';
import Captures from 'app/components/Captures';
import allPieceMoves from 'logic/moves/allPieceMoves';
import isPromotingPawn from 'logic/board/pawnPromotionOptions';
import { Piece } from 'logic/positions/piece';
import { useState } from 'react';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { isCheckmate, isInCheck } from 'logic/check';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const { 
    currentPlayer,
    moves, 
    boards, 
    toggleSelectedSquare, 
    selectedSquare, 
    makeNextMove,
    castling,
    enPassantSquares,
    capturedBlacks,
    capturedWhites
  } = useOldGameStore();

  const [handlePromotePawn, setHandlePromotePawn] = useState<
    ((p: Piece ) => void) | null
  >(null);
  
  const currentBoard = [...boards].pop()!;

  if(!currentBoard){
    return null;
  }

  const validMoves = selectedSquare 
    && allPieceMoves(
      currentBoard, 
      selectedSquare, 
      castling.get(currentBoard), 
      enPassantSquares.get(currentBoard) 
    ) || undefined;

  const handleClickSquare = (clickedSquare: Square) => {
    const playerAtClicked = playerAt(currentBoard, clickedSquare);

    if (selectedSquare && selectedSquare === clickedSquare){
      return toggleSelectedSquare(null);
    }

    else if (currentPlayer === playerAtClicked) {
      return toggleSelectedSquare(clickedSquare)
    }
    
    else if (!selectedSquare){
      return toggleSelectedSquare(null)
    }

    else if (canMoveTo(
      currentBoard, 
      selectedSquare, 
      clickedSquare,
      castling.get(currentBoard),
      enPassantSquares.get(currentBoard),
    )) {

      if (isPromotingPawn(currentBoard, selectedSquare, clickedSquare)) {
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
      <Captures captures={capturedWhites.get(currentBoard)!} />
      <Grid 
        board={currentBoard} 
        orientation={0}
        onClickSquare={handleClickSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        currentPlayer={currentPlayer}
      />
      <Captures captures={capturedBlacks.get(currentBoard)!} />
      <div>
      {isCheckmate(currentBoard, currentPlayer) ? (
          <div>
            <div>CHECKMATE -- {otherPlayer(currentPlayer)} WINS</div>
            <button>New Game</button>
          </div>
        ) : (<>
            <div>{currentPlayer}&apos; turn</div>
            {isInCheck(currentBoard, currentPlayer) ?? (
              <div>{currentPlayer} is in check</div>
            )}
          </>
        )}
      </div>
    </div>
    <PawnPromotionPrompt onPromote={handlePromotePawn} />
  </>)
}
