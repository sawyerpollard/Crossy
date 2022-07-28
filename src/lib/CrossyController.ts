import { Direction, CellValue, CellLocation, CellNumber, Cell, Clue } from './types';

const { Across, Down } = Direction;

export default class CrossyController {
    constructor(cells: Cell[][], clues: Record<Direction, Clue[]>) {
        this.cells = cells;
        this.clues = clues;

        this.width = this.cells[0].length;
        this.height = this.cells.length;

        this.selectedClue = this.clues[Across][0];
    }

    private width: number;
    private height: number;

    private focusedCell: CellLocation = [0, 0];
    private focusDirection: Direction = Across;

    private cells: Cell[][];

    public clues: Record<Direction, Clue[]> = {
        [Across]: [],
        [Down]: [],
    };

    private selectedClue: Clue;

    getValue(location: CellLocation): CellValue {
        return this.getCell(location).value;
    }

    setValue(location: CellLocation, value: CellValue): void {
        this.getCell(location).value = value;
    }

    getAnswer(location: CellLocation): CellValue {
        return this.getCell(location).answer;
    }

    getWidth(): number {
        return this.width;
    }

    getNumber(location: CellLocation): CellNumber {
        return this.getCell(location).number;
    }

    getHeight(): number {
        return this.height;
    }

    getFocusedCell(): CellLocation {
        return this.focusedCell;
    }

    setFocusedCell(location: CellLocation): void {
        this.focusedCell = location;
    }

    isFocused(location: CellLocation): boolean {
        const focusedCell = this.getFocusedCell();
        return focusedCell[0] === location[0] && focusedCell[1] === location[1];
    }

    isBlock(location: CellLocation): boolean {
        return this.getCell(location).isBlock;
    }

    isHighlighted(location: CellLocation): boolean {
        const focusedCell = this.getFocusedCell();

        if (this.focusDirection === Across) {
            if (location[0] !== focusedCell[0]) return false;
            let testCell = location;
            while (!this.outOfBounds(testCell) && !this.isBlock(testCell)) {
                if (testCell[1] === focusedCell[1]) return true;
                testCell = [testCell[0], testCell[1] + 1];
            }

            testCell = location;
            while (!this.outOfBounds(testCell) && !this.isBlock(testCell)) {
                if (testCell[1] === focusedCell[1]) return true;
                testCell = [testCell[0], testCell[1] - 1];
            }
        } else if (this.focusDirection === Down) {
            if (location[1] !== focusedCell[1]) return false;
            let testCell = location;
            while (!this.outOfBounds(testCell) && !this.isBlock(testCell)) {
                if (testCell[0] === focusedCell[0]) return true;
                testCell = [testCell[0] + 1, testCell[1]];
            }

            testCell = location;
            while (!this.outOfBounds(testCell) && !this.isBlock(testCell)) {
                if (testCell[0] === focusedCell[0]) return true;
                testCell = [testCell[0] - 1, testCell[1]];
            }
        }

        return false;
    }

    outOfBounds(location: CellLocation) {
        if (location[0] < 0 || location[0] > this.getHeight() - 1) return true;
        if (location[1] < 0 || location[1] > this.getHeight() - 1) return true;
        return false;
    }

    switchFocusDirection(): void {
        if (this.focusDirection === Across) {
            this.focusDirection = Down;
        } else {
            this.focusDirection = Across;
        }
    }

    clearCell(location: CellLocation): void {
        this.getCell(location).value = '';
    }

    getFocusDirection(): Direction {
        return this.focusDirection;
    }

    setFocusDirection(direction: Direction): void {
        this.focusDirection = direction;
    }

    getFocusedClue(): Clue {
        return this.getCellClue(this.getFocusedCell());
    }

    getClue(number: CellNumber, direction: Direction): Clue {
        for (let clue of this.clues[direction]) {
            if (clue.number === number) return clue;
        }

        return this.clues[direction][0];
    }

    getCell(location: CellLocation): Cell {
        return this.cells[location[0]][location[1]];
    }

    getCellClue(location: CellLocation): Clue {
        const focusDirection = this.getFocusDirection();

        let cellNumber: CellNumber = 0;
        if (focusDirection === Across) {
            let clueCell = location;
            while (!this.outOfBounds(clueCell) && !this.isBlock(clueCell)) {
                clueCell = [clueCell[0], clueCell[1] - 1];
            }
            clueCell = [clueCell[0], clueCell[1] + 1];

            cellNumber = this.getCell(clueCell).number;
        } else if (focusDirection === Down) {
            let clueCell = location;
            while (!this.outOfBounds(clueCell) && !this.isBlock(clueCell)) {
                clueCell = [clueCell[0] - 1, clueCell[1]];
            }
            clueCell = [clueCell[0] + 1, clueCell[1]];

            cellNumber = this.getCell(clueCell).number;
        }

        return this.getClue(cellNumber, focusDirection);
    }

    focusNextClue(): void {
        const { direction, index } = this.getFocusedClue();
        const numClues = this.clues[direction].length;
        const nextClue = this.clues[direction][(index + 1) % numClues];
        this.focusClue(nextClue);
    }

    focusClue(clue: Clue): void {
        this.setFocusDirection(clue.direction);

        for (let i = 0; i < this.width * this.height; i++) {
            const row = Math.floor(i / this.width);
            const col = i % this.width;

            if (this.getNumber([row, col]) === clue.number) {
                this.setFocusedCell([row, col]);
            }
        }
    }

    focusNextCell(): void {
        if (this.focusDirection === Across) {
            this.focusRight();
        } else if (this.focusDirection === Down) {
            this.focusDown();
        }
    }

    focusPrevCell(): void {
        if (this.focusDirection === Across) {
            this.focusLeft();
        } else if (this.focusDirection === Down) {
            this.focusUp();
        }
    }

    clearPuzzle(): void {
        for (let i = 0; i < this.width * this.height; i++) {
            const row = Math.floor(i / this.width);
            const col = i % this.width;

            this.clearCell([row, col]);
        }
    }

    revealPuzzle(): void {
        for (let i = 0; i < this.width * this.height; i++) {
            const row = Math.floor(i / this.width);
            const col = i % this.width;

            this.setValue([row, col], this.getAnswer([row, col]));
        }
    }

    checkPuzzle(): boolean {
        return this.cells.every((row) => row.every((cell) => cell.value === cell.answer));
    }

    focusUp(passBlocks = false): void {
        const focusedCell: CellLocation = this.getFocusedCell();
        let nextCell: CellLocation = [focusedCell[0] - 1, focusedCell[1]];

        while (passBlocks && !this.outOfBounds(nextCell) && this.isBlock(nextCell)) {
            nextCell = [nextCell[0] - 1, nextCell[1]];
        }

        if (!this.outOfBounds(nextCell) && !this.isBlock(nextCell)) {
            this.setFocusedCell(nextCell);
        }
    }

    focusDown(passBlocks = false): void {
        const focusedCell: CellLocation = this.getFocusedCell();
        let nextCell: CellLocation = [focusedCell[0] + 1, focusedCell[1]];

        while (passBlocks && !this.outOfBounds(nextCell) && this.isBlock(nextCell)) {
            nextCell = [nextCell[0] + 1, nextCell[1]];
        }

        if (!this.outOfBounds(nextCell) && !this.isBlock(nextCell)) {
            this.setFocusedCell(nextCell);
        }
    }

    focusLeft(passBlocks = false): void {
        const focusedCell: CellLocation = this.getFocusedCell();
        let nextCell: CellLocation = [focusedCell[0], focusedCell[1] - 1];

        while (passBlocks && !this.outOfBounds(nextCell) && this.isBlock(nextCell)) {
            nextCell = [nextCell[0], nextCell[1] - 1];
        }

        if (!this.outOfBounds(nextCell) && !this.isBlock(nextCell)) {
            this.setFocusedCell(nextCell);
        }
    }

    focusRight(passBlocks = false): void {
        const focusedCell: CellLocation = this.getFocusedCell();
        let nextCell: CellLocation = [focusedCell[0], focusedCell[1] + 1];

        while (passBlocks && !this.outOfBounds(nextCell) && this.isBlock(nextCell)) {
            nextCell = [nextCell[0], nextCell[1] + 1];
        }

        if (!this.outOfBounds(nextCell) && !this.isBlock(nextCell)) {
            this.setFocusedCell(nextCell);
        }
    }
}
