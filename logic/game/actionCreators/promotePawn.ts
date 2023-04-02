import { moveHash } from "logic/board/move";
import { Piece } from "logic/squares/piece";
import { Square } from "logic/squares/square";
import { GameView, PawnPromoteTuple } from "../gameState";
import { Action } from "./Action";

const promotePawn = (arg: PawnPromoteTuple | null): Action => (
  { actions: { move, promptToPromotePawn }}
) => ({
  onPromotePawn: arg
    ? (promotePawnTo :Piece) => {
      const [from, to] = arg;
      move(from, to, promotePawnTo);
      promptToPromotePawn(null);
    } : null,
});

export default promotePawn;