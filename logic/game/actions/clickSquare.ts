import { playerAt } from 'logic/squares';
import isPromotingPawn from 'logic/board/pawnPromotionOptions';
import { Piece } from 'logic/squares/piece';
import { Action } from "./Action";
import { GameView } from '../gameState';
import { currentCastling } from '../selectors/castling';
import { currentEnPassantSquare } from '../selectors/enPassant';
import currentPlayer from '../selectors/players';
import { currentBoard } from '../selectors/boards';
import { Square } from 'logic/squares/square';
import canMoveTo from 'logic/moves/canMoveTo';

const clickSquare = (targetSquare: Square | null): Action => (gameView: GameView) => {

  const precludedCastling = currentCastling(gameView);
  const epSquare = currentEnPassantSquare(gameView);
  const thisPlayer = currentPlayer(gameView);
  const thisBoard = currentBoard(gameView);
  const { selectedSquare, onPromotePawn } = gameView;
  const { makeNextMove, setOnPromotePawn } = gameView.actions;

  if(!targetSquare){
    return {
      selectedSquare: null
    }
  }
  //clicking the already-selected square (de-select):
  if (selectedSquare && selectedSquare === targetSquare){
    return {
      selectedSquare: null
    };
  }
  //clicking one's own piece (select):
  if (thisPlayer === playerAt(thisBoard, targetSquare)) {
    return {
      selectedSquare: targetSquare
    }
  }
  //No selection before click, but clicking some other square (they can't):
  if (!selectedSquare){
    return {
      selectedSquare: null
    };
  }

  //There's already a selection, and they're clicking another square, 
  //so it's a move attempt. If it's a legit move, do it (unless pawn promo):
  if (canMoveTo(
    thisBoard, 
    selectedSquare, 
    targetSquare,
    precludedCastling,
    epSquare,
  )) {
    //If it's a pawn promotion, we don't do the move yet  because 
    //we need to prompt them for which piece to promote to:
    if (isPromotingPawn(thisBoard, selectedSquare, targetSquare)) {
      return {
        onPromotePawn: (promotePawnTo) => {
          makeNextMove(selectedSquare, targetSquare, promotePawnTo);
          setOnPromotePawn(null);
        },
        selectedSquare: null
      }
    }
    else {
      makeNextMove(selectedSquare, targetSquare);
    }
  }
  return {
    selectedSquare: null
  }
}

export default clickSquare;