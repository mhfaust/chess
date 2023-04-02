import { GameView } from "../gameState";

export type Action = (partialStore: Partial<GameView>) => Partial<GameView>;