import { CastlingPreclusions }  from 'rules/types/CastlingPreclusions';
import { PositionName }  from 'rules/positions/positionName';

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

function nextCastlingPreclusions(
    movedFrom: PositionName,
    prev?: CastlingPreclusions
): CastlingPreclusions {

    const nextSet = new Set(prev);
    if(castleAndKingStartsSet.has(movedFrom)){
        addPreclusions[movedFrom as CastleAndKingStarts](nextSet);
    };
    return nextSet;

}



export default nextCastlingPreclusions;