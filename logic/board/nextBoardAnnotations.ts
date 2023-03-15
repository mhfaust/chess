import { playerAt, otherPlayer, pieceAt }  from 'logic/positions';
import { isInCheck, isCheckmate }  from 'logic/check';
import { nextCastlingPreclusions }  from 'logic/board';
import { Board }  from 'logic/types/Board';
import { Piece }  from 'logic/positions/piece';
import { Player }  from 'logic/types/Player';
import { Square }  from 'logic/positions/square';
import { BoardAnnotations }  from 'logic/types/Game';

export const makeCapturedPieces = (
    board: Board, 
    prevCaptures: Array<Piece>, 
    defender: Player, 
    moveTo: Square
) : Array<Piece> => {
    
    if (playerAt(board, moveTo) !== defender) {
        return prevCaptures;
    }
    const pieceAtTarget = pieceAt(board, moveTo);
    if (pieceAtTarget){
        return [
            ...prevCaptures, 
            pieceAtTarget
        ]
    }
    return prevCaptures;
}

function nextBoardAnnotations(
    previousBoard: Board,
    currentBoard: Board,
    previousAnnotations: BoardAnnotations,  
    pieceMovedFromPosition: Square, 
    pieceMovedToPosition: Square
): BoardAnnotations {
    const { castlingPreclusions: prevCastlingPreclusions } = previousAnnotations;
    const castlingPreclusions = nextCastlingPreclusions(pieceMovedFromPosition, prevCastlingPreclusions);
    
    const lastPlayerMoved = playerAt(previousBoard, pieceMovedFromPosition);
    const lastPieceMoved = pieceAt(previousBoard, pieceMovedFromPosition)
    const nextPlayer = otherPlayer(lastPlayerMoved || 'Black');
    const nextTurnIsInCheck = isInCheck(currentBoard, nextPlayer);
    const nextTurnIsCheckmate = isCheckmate(currentBoard, nextPlayer);
    const capturedBlackPieces = makeCapturedPieces(previousBoard, previousAnnotations.capturedBlackPieces, 'Black', pieceMovedToPosition);
    const capturedWhitePieces = makeCapturedPieces(previousBoard, previousAnnotations.capturedWhitePieces, 'White', pieceMovedToPosition);
        
    // const next : BoardAnnotations = {
    const next: BoardAnnotations   = {
        castlingPreclusions,
        lastPieceMoved,
        lastMoveFrom: pieceMovedFromPosition,
        lastMoveTo: pieceMovedToPosition,
        currentPlayer: nextPlayer,
        isInCheck: nextTurnIsInCheck,
        isCheckmate: nextTurnIsCheckmate,
        capturedBlackPieces,
        capturedWhitePieces
    }

    return next;
}

export default nextBoardAnnotations;