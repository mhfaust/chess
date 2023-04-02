import { Action } from "./Action";

const toggleBoard = (boardCursor: number): Action => () => ({ boardCursor });

export default toggleBoard;