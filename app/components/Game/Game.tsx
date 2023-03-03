'use client'

import ChessBoard from 'app/components/Grid/Grid';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { Player } from 'rules/types/Player';
import { playerAt } from 'rules/positions';
import Captures from 'app/components/Captures';
import allPieceMoves from 'rules/moves/allPieceMoves';
import isPromotingPawn from 'rules/board/pawnPromotionOptions';
import { PawnPromotionOptionsProps } from 'app/components/PawnPromotionPrompt/PawnPromotionPrompt';
import { Piece } from 'rules/positions/piece';
import { useState } from 'react';
import PawnPromotionPrompt from '../PawnPromotionPrompt';

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

  const [promotePawn, setPromotePawn] = useState<((p:Piece )=> void) | null>(null);
  
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

    if(!selectedSquare){
      const isPlayersPiece = currentPlayer === playerAtClicked;
      return toggleSquare(isPlayersPiece ? clickedSquare : null)
    }

    if (selectedSquare === clickedSquare){
      return toggleSquare(null);
    }

    if (canMoveTo(
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
      <ChessBoard 
        board={currentBoard} 
        orientation={0}
        onClickSquare={handleClickSquare}
        selectedSquare={selectedSquare}
        validMoves={validMoves}
        currentPlayer={currentPlayer}
      />
      <Captures captures={capturedBlacks.get(currentBoard)!} />
      <div>Turn: {currentPlayer}</div>
      <div>Selected Square: {selectedSquare}</div>
      <div>En Passant Square: {enPassantSquares.get(currentBoard)}</div>
    </div>
    <PawnPromotionPrompt onPromote={promotePawn} />
  </>)
}
