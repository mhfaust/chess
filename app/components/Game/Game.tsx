'use client'

import Grid from 'app/components/Grid/Grid';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { otherPlayer, playerAt } from 'rules/positions';
import Captures from 'app/components/Captures';
import allPieceMoves from 'rules/moves/allPieceMoves';
import isPromotingPawn from 'rules/board/pawnPromotionOptions';
import { Piece } from 'rules/positions/piece';
import { useState } from 'react';
import PawnPromotionPrompt from '../PawnPromotionPrompt';
import { isCheckmate, isInCheck } from 'rules/check';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function Game() {

  const { 
    currentPlayer,
    moves, 
    boards, 
    toggleSquare, 
    selectedSquare, 
    makeNextMove,
    castling,
    enPassantSquares,
    capturedBlacks,
    capturedWhites
  } = useGameStore();

  const [promotePawn, setPromotePawn] = useState<
    ((p:Piece ) => void) | null
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

  const handleClickSquare = (clickedSquare: PositionName) => {
    const playerAtClicked = playerAt(currentBoard, clickedSquare);

    if (selectedSquare && selectedSquare === clickedSquare){
      return toggleSquare(null);
    }

    else if (currentPlayer === playerAtClicked) {
      return toggleSquare(clickedSquare)
    }
    
    else if (!selectedSquare){
      return toggleSquare(null)
    }

    else if (canMoveTo(
      currentBoard, 
      selectedSquare, 
      clickedSquare,
      castling.get(currentBoard),
      enPassantSquares.get(currentBoard),
    )) {

      if(isPromotingPawn(currentBoard, selectedSquare, clickedSquare)) {
        setPromotePawn(() => (promotePawnAs: Piece) => {
            makeNextMove(selectedSquare, clickedSquare, promotePawnAs);
            setPromotePawn(null);
        })
      }
      else {
        makeNextMove(selectedSquare, clickedSquare);
      }
      return toggleSquare(null)
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
            <div>{currentPlayer}'s turn</div>
            {isInCheck(currentBoard, currentPlayer) ?? (
              <div>{currentPlayer} is in check</div>
            )}
          </>
        )}
      </div>
    </div>
    <PawnPromotionPrompt onPromote={promotePawn} />
  </>)
}
