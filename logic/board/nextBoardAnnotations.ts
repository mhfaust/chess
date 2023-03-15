import { playerAt, otherPlayer, pieceAt }  from 'logic/squares';
import { isInCheck, isCheckmate }  from 'logic/check';
import { nextCastlingPreclusions }  from 'logic/board';
import { Board }  from 'logic/types/Board';
import { Piece }  from 'logic/squares/piece';
import { Player }  from 'logic/types/Player';
import { Square }  from 'logic/squares/square';
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
    pieceMovedFromSquare: Square, 
    pieceMovedToSquare: Square
): BoardAnnotations {
    const { castlingPreclusions: prevCastlingPreclusions } = previousAnnotations;
    const castlingPreclusions = nextCastlingPreclusions(pieceMovedFromSquare, prevCastlingPreclusions);
    
    const lastPlayerMoved = playerAt(previousBoard, pieceMovedFromSquare);
    const lastPieceMoved = pieceAt(previousBoard, pieceMovedFromSquare)
    const nextPlayer = otherPlayer(lastPlayerMoved || 'Black');
    const nextTurnIsInCheck = isInCheck(currentBoard, nextPlayer);
    const nextTurnIsCheckmate = isCheckmate(currentBoard, nextPlayer);
    const capturedBlackPieces = makeCapturedPieces(previousBoard, previousAnnotations.capturedBlackPieces, 'Black', pieceMovedToSquare);
    const capturedWhitePieces = makeCapturedPieces(previousBoard, previousAnnotations.capturedWhitePieces, 'White', pieceMovedToSquare);
        
    // const next : BoardAnnotations = {
    const next: BoardAnnotations   = {
        castlingPreclusions,
        lastPieceMoved,
        lastMoveFrom: pieceMovedFromSquare,
        lastMoveTo: pieceMovedToSquare,
        currentPlayer: nextPlayer,
        isInCheck: nextTurnIsInCheck,
        isCheckmate: nextTurnIsCheckmate,
        capturedBlackPieces,
        capturedWhitePieces
    }

    return next;
}

export default nextBoardAnnotations;