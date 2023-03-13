import { playerAt, otherPlayer, pieceAt }  from 'rules/positions';
import { isInCheck, isCheckmate }  from 'rules/check';
import { nextCastlingPreclusions }  from 'rules/board';
import { Board }  from 'rules/types/Board';
import { Piece }  from 'rules/positions/piece';
import { Player }  from 'rules/types/Player';
import { PositionName }  from 'rules/positions/positionName';
import { BoardAnnotations }  from 'rules/types/Game';

export const makeCapturedPieces = (
    board: Board, 
    prevCaptures: Array<Piece>, 
    defender: Player, 
    moveTo: PositionName
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
    pieceMovedFromPosition: PositionName, 
    pieceMovedToPosition: PositionName
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