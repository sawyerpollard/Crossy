import * as ipuz from './ipuz';
import { Cell, Clue, Direction } from './types';

export async function fetchIpuz(url: string): Promise<ipuz.IpuzCrossword> {
    const res = await fetch(url);
    const json = await res.json();
    const ipuz = json as ipuz.IpuzCrossword;
    return ipuz;
}

export function cellsFromIpuz(ipuz: ipuz.IpuzCrossword): Cell[][] {
    if (ipuz.solution === undefined) throw new Error('No solution in Ipuz.');

    const BLOCK = String(ipuz.block ?? '#');
    const EMPTY = String(ipuz.empty ?? 0);
    const BLANK = '';

    const cellValues = Array.from({ length: ipuz.dimensions.height }, () => Array(ipuz.dimensions.width).fill(BLANK));

    const cellAnswers = ipuz.solution.map((row) => {
        return row.map((answer) => {
            if (typeof answer === 'string') {
                return answer;
            } else if (answer instanceof Object && !(answer instanceof Array) && typeof answer.value === 'string') {
                return answer.value;
            } else if (answer === null) {
                return BLANK;
            } else {
                throw new Error('Failed to parse Ipuz solutions.');
            }
        });
    });;

    const cellNumbers = ipuz.puzzle.map((row) => {
        return row.map((cellNumber) => {
            let parsedNumber: String = EMPTY;
            if (cellNumber instanceof Object && cellNumber.cell !== undefined) {
                parsedNumber = String(cellNumber.cell);
            } else if (cellNumber) {
                parsedNumber = String(cellNumber);
            }
            return (parsedNumber === BLOCK || parsedNumber === EMPTY) ? null : Number(parsedNumber);
        });
    });

    const blockCells = ipuz.puzzle.map((row) => {
        return row.map((value) => {
            if (value instanceof Object) {
                return value.cell === BLOCK || value.cell === null;
            } else {
                return value === BLOCK || value === null;
            }
        });
    });

    const cells: Cell[][] = Array.from({ length: ipuz.dimensions.height }, () => []);
    for (let i = 0; i < ipuz.dimensions.width; i++) {
        for (let j = 0; j < ipuz.dimensions.height; j++) {
            const cell: Cell = {
                isBlock: blockCells[i][j],
                number: cellNumbers[i][j],
                value: cellValues[i][j],
                answer: cellAnswers[i][j],
                location: [i, j],
            };
            cells[i][j] = cell;
        }
    }

    return cells;
}

export function cluesFromIpuz(ipuz: ipuz.IpuzCrossword): Record<Direction, Clue[]> {
    if (ipuz.clues === undefined) throw new Error('No clues in Ipuz.');

    const accrossClues = ipuz.clues['Across'].map((clue, index) => {
        if (clue instanceof Array) {
            return {
                number: clue[0],
                direction: Direction.Across,
                message: clue[1],
                index,
            } as Clue;
        } else if (clue instanceof Object && clue.number !== undefined && clue.clue !== undefined) {
            return {
                number: clue.number,
                direction: Direction.Across,
                message: clue.clue,
                index,
            } as Clue;
        } else {
            throw new Error('Failed to parse Ipuz clues.');
        }
    });

    const downClues = ipuz.clues['Down'].map((clue, index) => {
        if (clue instanceof Array) {
            return {
                number: clue[0],
                direction: Direction.Down,
                message: clue[1],
                index,
            } as Clue;
        } else if (clue instanceof Object && clue.number !== undefined && clue.clue !== undefined) {
            return {
                number: clue.number,
                direction: Direction.Down,
                message: clue.clue,
                index,
            } as Clue;
        } else {
            throw new Error('Failed to parse Ipuz clues.');
        }
    });

    return {
        [Direction.Across]: accrossClues,
        [Direction.Down]: downClues
    };
}
