import { 
    initialBoard, 
    move, 
    initialBoardAnnotations, 
    nextBoardAnnotations 
} from 'rules/board';
import { Player }  from 'rules/types/Player';
import { canMoveTo }  from 'rules/moves';  
import enPassantSquare  from 'rules/moves/enPassantSquare';
import { playerAt }  from 'rules/positions';
import { PositionName }  from 'rules/positions/positionName';
import { BoardAnnotations } from 'rules/types/Game';
import { Board } from 'rules/types/Board';
import { Piece } from 'rules/positions/piece';

export type Move = [PositionName, PositionName, Piece | undefined];

function validateGameMoves(gameMoves: Move[]){

    let error: string | null = null;

    const annotatedMoves: { board: Board, annotations: BoardAnnotations }[] = [
        { 
            board: initialBoard(),
            annotations: initialBoardAnnotations()
        }
    ];

    for(let [from, to] of gameMoves){
        const { 
            board: prevBoard,
            annotations: prevAnnotations 
        } = [...annotatedMoves].pop()!;

        const playerMoving = playerAt(prevBoard, from);
        const expectedMover: Player = annotatedMoves.length % 2 === 1 ? 'White' : 'Black';
        if(playerMoving !== expectedMover){
            const playersMove = Math.ceil((annotatedMoves.length + 1) / 2)
            error = `${playerMoving ?? 'No'} piece found at move from position, on ${expectedMover}' move #${playersMove}.`
            break;
        }

        if (prevAnnotations.isCheckmate){
            error = `Attempted to move ${playerMoving} when they were in checkmate.`;
            break;
        }

        const epSquare = enPassantSquare(prevBoard, from, to );

        if (!canMoveTo(prevBoard, from, to, null, epSquare)) {
            error = `Illegal move: from ${from} to ${to}.`;
            break;
        }

        const [board] = move(prevBoard, from, to, null);
        const annotations = nextBoardAnnotations(prevBoard, board, prevAnnotations as BoardAnnotations, from, to);
        annotatedMoves.push( {
            board,
            annotations
        });
    };
    return { validMoves: annotatedMoves, error };
}

export default validateGameMoves;