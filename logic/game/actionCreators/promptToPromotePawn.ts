import { Piece } from "logic/squares/piece";
import { PawnPromoteTuple } from "../gameState";
import { Action } from "./Action";

const promptToPromotePawn = (arg: PawnPromoteTuple | null): Action => (
  { actions: { move, promptToPromotePawn }}
) => ({
  onPromotePawn: arg
    ? (promotePawnTo :Piece) => {
      const [from, to] = arg;
      move(from, to, promotePawnTo);
      promptToPromotePawn(null);
    } : null,
});

export default promptToPromotePawn;