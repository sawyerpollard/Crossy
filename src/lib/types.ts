// Common types
export enum Direction {
    Across = 'Across',
    Down = 'Down',
}

// Cell types
export type CellValue = string;
export type CellLocation = [number, number];
export type CellNumber = number | null;

export type Cell = {
    isBlock: boolean;
    number: CellNumber;
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
