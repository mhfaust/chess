import { Piece } from '@/logic/squares/piece';
import { Actions, PawnPromoteTuple } from '../gameState';

export type PromptToPromotePawnParams = Parameters<typeof promptToPromotePawn>;

type TArgs = {
	actions: Pick<Actions, 'move' | 'promptToPromotePawn'>;
};

const promptToPromotePawn = (arg: PawnPromoteTuple | null) =>
(
	{ actions: { move, promptToPromotePawn } }: TArgs,
) => ({
	onPromotePawn: arg
		? (promotePawnTo: Piece) => {
			const [from, to] = arg;
			move(from, to, promotePawnTo);
			promptToPromotePawn(null);
		}
		: null,
});

export default promptToPromotePawn;
