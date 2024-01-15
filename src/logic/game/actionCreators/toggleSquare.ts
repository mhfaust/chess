import canMoveTo from '@/logic/moves/canMoveTo';
import shouldPromptToPromotePawn from '@/logic/position/pawnPromotionOptions';
import { playerAt } from '@/logic/squares';
import { Square } from '@/logic/squares/square';
import { Actions, GameState } from '../gameState';
import { currentCastling } from '../selectors/castling';
import { currentEnPassantSquare } from '../selectors/enPassant';
import currentPlayer from '../selectors/players';
import { currentPosition } from '../selectors/positions';

type TArgs = Pick<GameState, 'gamePlay' | 'positionCursor' | 'onPromotePawn' | 'selectedSquare'> & {
	actions: Pick<Actions, 'move' | 'promptToPromotePawn'>;
};

const toggleSquare = (targetSquare: Square | null) => (gameView: TArgs): Partial<GameState> => {
	const precludedCastling = currentCastling(gameView);
	const epSquare = currentEnPassantSquare(gameView);
	const thisPlayer = currentPlayer(gameView);
	const thisPosition = currentPosition(gameView);
	const { selectedSquare } = gameView;
	const { move, promptToPromotePawn } = gameView.actions;

	if (!targetSquare) {
		return {
			selectedSquare: null,
		};
	}
	// clicking the already-selected square (de-select):
	if (selectedSquare && selectedSquare === targetSquare) {
		return {
			selectedSquare: null,
		};
	}
	// clicking one's own piece (select):
	if (thisPlayer === playerAt(thisPosition, targetSquare)) {
		return {
			selectedSquare: targetSquare,
		};
	}
	// No selection before click, but clicking some other square (they can't):
	if (!selectedSquare) {
		return {
			selectedSquare: null,
		};
	}

	// There's already a selection, and they're clicking another square,
	// so it's a move attempt. If it's a legit move, do it (unless pawn promo):
	if (
		canMoveTo(
			thisPosition,
			selectedSquare,
			targetSquare,
			precludedCastling,
			epSquare,
		)
	) {
		// If it's a pawn promotion, we don't do the move yet  because
		// we need to prompt them for which piece to promote to:
		if (shouldPromptToPromotePawn(thisPosition, selectedSquare, targetSquare)) {
			return {
				onPromotePawn: (promotePawnTo) => {
					move(selectedSquare, targetSquare, promotePawnTo);
					promptToPromotePawn(null);
				},
				selectedSquare: null,
			};
		} else {
			move(selectedSquare, targetSquare);
		}
	}
	return {
		selectedSquare: null,
	};
};

export default toggleSquare;
