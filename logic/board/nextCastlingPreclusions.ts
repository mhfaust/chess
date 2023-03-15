import { CastlingPreclusions }  from 'logic/types/CastlingPreclusions';
import { Square }  from 'logic/positions/positionName';

const castleAndKingStartsArray = [
    'a1', // White Rook
    'e1', // White King
    'h1', // White Rook
    'a8', // Black Rook
    'e8', // Black King
    'h8', // Black Rook
] as const;

const castleAndKingStartsSet = new Set(castleAndKingStartsArray) as Set<string>;
export type CastleAndKingStarts = typeof castleAndKingStartsArray[number];


type AddPreclusions = (set: CastlingPreclusions) => CastlingPreclusions;

const addPreclusions: Record<CastleAndKingStarts, AddPreclusions> = {
    'a1': (set: CastlingPreclusions) => set.add('a1'),
    'e1': (set: CastlingPreclusions) => set.add('a1').add('h1'),
    'h1': (set: CastlingPreclusions) => set.add('h1'),
    'a8': (set: CastlingPreclusions) => set.add('a8'),
    'e8': (set: CastlingPreclusions) => set.add('a8').add('h8'),
    'h8': (set: CastlingPreclusions) => set.add('a8'),
}

function nextCastlingPreclusions(
    movedFrom: Square,
    prev?: CastlingPreclusions
): CastlingPreclusions {

    const nextSet = new Set(prev);
    if(castleAndKingStartsSet.has(movedFrom)){
        addPreclusions[movedFrom as CastleAndKingStarts](nextSet);
    };
    return nextSet;

}



export default nextCastlingPreclusions;