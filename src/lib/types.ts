// Common types
export enum Direction {
    Across = 'ACROSS',
    Down = 'DOWN',
}

// Cell types
export type CellValue = string;
export type CellLocation = [number, number];
export type CellNumber = number | null;

export type Cell = {
    isBlock: boolean;
    number: number;
    value: CellValue;
    answer: CellValue;
    location: CellLocation;
};

// Clue types
export type Clue = {
    number: number;
    direction: Direction;
    message: string;
    index: number;
};

// Format types
export type Ipuz = {
    origin: string;
    version: string;
    kind: string[];
    copyright: string;
    author: string;
    publisher: string;
    title: string;
    intro: string;
    difficulty: string;
    empty: string;
    dimensions: { width: number; height: number };
    puzzle: (number | string | any)[][];
    clues: {
        Across: (number | string)[][];
        Down: (number | string)[][];
    };
    solution: string[][];
};
