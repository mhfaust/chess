import { BoardAnnotations }  from 'rules/types/Game';

const initialBoardAnnotations = (): BoardAnnotations => {
    return {
        // lastPlayerMoved: null,
        lastPieceMoved: null,
        lastMoveFrom: null,
        lastMoveTo: null,
        whoseTurn: 'White',
        isInCheck: false,
        isCheckmate: false,
        capturedBlackPieces: [],
        capturedWhitePieces: [],
        castlingPreclusions: new Set(),
    }
}

export default initialBoardAnnotations;