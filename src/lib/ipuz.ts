export type BlockValue = string | number;

export type EmptyValue = string | number;

export interface Ipuz {
    version: string;
    kind: string[];
    copyright?: string;
    publisher?: string;
    publication?: string;
    url?: string;
    uniqueid?: string;
    title?: string;
    intro?: string;
    explanation?: string;
    annotation?: string;
    author?: string;
    editor?: string;
    date?: string;
    notes?: string;
    difficulty?: string;
    charset?: string;
    origin?: string;
    block?: BlockValue;
    empty?: EmptyValue;
    styles?: Record<string, unknown>;
};

export type StyleSpec = unknown;

export type Cell = null | BlockValue | EmptyValue;

export type StyledCell = Cell | {
    cell?: Cell;
    style?: StyleSpec;
};

export type ClueNum = number | string;

export type LabeledCell = Cell | ClueNum | {
    cell?: Cell | ClueNum;
    style?: StyleSpec;
    value?: string;
};

export type CrosswordValue = Cell | string | CrosswordValue[] | {
    value?: Cell | string | CrosswordValue[];
    style?: StyleSpec;
    Across?: CrosswordValue;
    Down?: CrosswordValue;
};

export type Direction = 'Across' | 'Down'; // Only for crosswords

export type Enumeration = string | number;

export type CrossReference = { direction: Direction; number: ClueNum };

export type Clue = string | [ClueNum, string] | {
    number?: ClueNum;
    numbers?: ClueNum[];
    label?: string
    cells?: [number, number][];
    clue?: string;
    hints?: string[];
    image?: string;
    answer?: string;
    enumeration?: Enumeration;
    continued?: CrossReference[];
    references?: CrossReference[];
    type?: string;
    explanation?: string;
    tags?: string[];
    highlight?: boolean;
    location?: [number, number];
};

export type Dimension = 'width' | 'height';

export type GroupSpec = {
    rect?: [number, number, number, number];
    line?: [[number, number], [number, number], number];
    cells?: [number, number][];
    style?: StyleSpec;
};

export interface IpuzCrossword extends Ipuz {
    dimensions: Record<Dimension, number>;
    puzzle: LabeledCell[][];
    checksum?: string[];
    saved?: CrosswordValue[][];
    solution?: CrosswordValue[][];
    zones?: GroupSpec[];
    clues?: Record<Direction, Clue[]>;
    showenumerations?: boolean;
    clueplacement?: 'before' | 'after' | null | 'blocks';
    answer?: string;
    answers?: string[];
    enumeration?: any;
    enumerations?: any[];
    misses?: Record<string, string>;
};
