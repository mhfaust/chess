import { CastlingPreclusions, RookStartPosition }  from 'rules/types/CastlingPreclusions';
import { PositionName }  from 'rules/positions/positionName';
import { Board } from 'rules/types/Board';

const castleAndKingStartsArray = [
    'A1', // White Rook
    'E1', // White King
    'H1', // White Rook
    'A8', // Black Rook
    'E8', // Black King
    'H8', // Black Rook
] as const;

const castleAndKingStartsSet = new Set(castleAndKingStartsArray) as Set<string>;
export type CastleAndKingStarts = typeof castleAndKingStartsArray[number];


type AddPreclusions = (set: CastlingPreclusions) => CastlingPreclusions;

const addPreclusions: Record<CastleAndKingStarts, AddPreclusions> = {
    'A1': (set: CastlingPreclusions) => set.add('A1'),
    'E1': (set: CastlingPreclusions) => set.add('A1').add('H1'),
    'H1': (set: CastlingPreclusions) => set.add('H1'),
    'A8': (set: CastlingPreclusions) => set.add('A8'),
    'E8': (set: CastlingPreclusions) => set.add('A8').add('H8'),
    'H8': (set: CastlingPreclusions) => set.add('A8'),
}

const cache = new Map<Board, CastlingPreclusions>();

function castlingPreclusions(
    boards: Board[],
    movedFrom: PositionName,
) {

    if(!boards.length){
      throw Error('No boards provided to find castling preclusions.');
    }

    const boardsCopy = [...boards];
    const latestBoard = boardsCopy.pop()!;

    const cached = cache.get(latestBoard)
    if (cached) {
      return cached;
    }

    if(boards.length === 1){
      const preclusions = new Set<RookStartPosition>();
      cache.set(latestBoard, preclusions)
      return preclusions;
    }

    const previousBoard = [...boardsCopy].pop()!;
    // const previousPreclusions = castleAndKingStartsSet(boardsCopy)

    const nextSet = new Set();
    // if(castleAndKingStartsSet.has(movedFrom)){
    //     addPreclusions[movedFrom as CastleAndKingStarts](nextSet);
    // };
    return nextSet;

}



export default castlingPreclusions;

