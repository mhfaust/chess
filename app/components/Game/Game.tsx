'use client'

import ChessBoard from 'app/components/Grid/Grid';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { Player } from 'rules/types/Player';
import { playerAt } from 'rules/positions';
import Captures from 'app/components/Captures';
import allPieceMoves from 'rules/moves/allPieceMoves';
import pawnPromotionOptions from 'rules/board/pawnPromotionOptions';
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

  const [promptProps, setPromptProps] = useState<PawnPromotionOptionsProps>({
    isPrompting: false,
    onPromote: () => {},
  });
  
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

      const promotionOptions = pawnPromotionOptions(currentBoard, selectedSquare, clickedSquare);
      
      if(promotionOptions) {
        setPromptProps({
          isPrompting: true,
          onPromote: (option?: Piece) => {
            makeNextMove(selectedSquare, clickedSquare, option);
            setPromptProps({ isPrompting: false, onPromote: () => {} });
          }
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
    <PawnPromotionPrompt {...promptProps} />
  </>)
}
