import React from 'react';
import { Direction, Clue } from './lib/types';
import CrossyController from './lib/CrossyController';
import Grid from './components/Grid';
import Cell from './components/Cell';
import ClueBanner from './components/ClueBanner';
import ClueSection from './components/ClueSection';
import ControlBanner from './components/ControlBanner';

type CrossyProps = { controller: CrossyController };
type CrossyState = { cells: JSX.Element[] };

export default class Crossy extends React.Component<CrossyProps, CrossyState> {
    constructor(props: CrossyProps) {
        super(props);

        this.controller = this.props.controller;
        this.state = { cells: this.generateCells() };
    }

    controller: CrossyController;

    generateCells(): JSX.Element[] {
        const cells = [];
        for (let i = 0; i < this.controller.getHeight(); i++) {
            for (let j = 0; j < this.controller.getWidth(); j++) {
                const key = i * this.controller.getWidth() + j;

                const isBlock = this.controller.isBlock([i, j]);
                const number = this.controller.getNumber([i, j]);
                const value = this.controller.getValue([i, j]);
                const isFocused = this.controller.isFocused([i, j]);
                const isHighlighted = this.controller.isHighlighted([i, j]);

                if (isBlock) {
                    cells.push(<Cell block key={key} row={i} col={j} />);
                } else {
                    cells.push(
                        <Cell
                            value={value}
                            number={number !== null ? number : undefined}
                            focused={isFocused}
                            highlighted={isHighlighted}
                            row={i}
                            col={j}
                            handleClick={this.handleClick}
                            key={key}
                        />
                    );
                }
            }
        }

        return cells;
    }

    handleClick = (row: number, col: number) => {
        const focusedCell = this.controller.getFocusedCell();
        if (focusedCell && focusedCell[0] === row && focusedCell[1] === col) {
            this.controller.switchFocusDirection();
        }
        this.controller.setFocusedCell([row, col]);

        this.setState({ cells: this.generateCells() });
    };

    handleKey: React.KeyboardEventHandler = (e) => {
        e.preventDefault();
        const focusedCell = this.controller.getFocusedCell();
        const focusDirection = this.controller.getFocusDirection();

        if (this.isLetter(e.key)) {
            const letter = e.key.toUpperCase();

            this.controller.focusNextCell();
            this.controller.setValue(focusedCell, letter);
        }

        switch (e.key) {
            case 'Enter':
            case 'Tab':
                this.controller.focusNextClue();
                break;
            case 'Backspace':
                if (this.controller.getValue(focusedCell) === '') this.controller.focusPrevCell();
                this.controller.clearCell(this.controller.getFocusedCell());
                break;
            case 'ArrowUp':
                if (focusDirection === Direction.Across) {
                    this.controller.switchFocusDirection();
                } else {
                    this.controller.focusUp(true);
                }
                break;
            case 'ArrowDown':
                if (focusDirection === Direction.Across) {
                    this.controller.switchFocusDirection();
                } else {
                    this.controller.focusDown(true);
                }
                break;
            case 'ArrowLeft':
                if (focusDirection === Direction.Down) {
                    this.controller.switchFocusDirection();
                } else {
                    this.controller.focusLeft(true);
                }
                break;
            case 'ArrowRight':
                if (focusDirection === Direction.Down) {
                    this.controller.switchFocusDirection();
                } else {
                    this.controller.focusRight(true);
                }
                break;
        }

        this.setState({ cells: this.generateCells() });
    };

    isLetter(letter: string): boolean {
        return letter.length === 1 && letter.toLowerCase() !== letter.toUpperCase();
    }

    handleClueClick = (clue: Clue) => {
        this.controller.focusClue(clue);

        this.setState({ cells: this.generateCells() });
    };

    clearPuzzle = () => {
        this.controller.clearPuzzle();

        this.setState({ cells: this.generateCells() });
    };

    revealPuzzle = () => {
        this.controller.revealPuzzle();

        this.setState({ cells: this.generateCells() });
    };

    render() {
        return (
            <div className="outline-none" tabIndex={-1} onKeyDown={this.handleKey}>
                <div className="grid lg:grid-cols-2 gap-4 overflow-scroll">
                    <div className="flex flex-col gap-y-4">
                        <ClueBanner clue={this.controller.getFocusedClue()} />
                        <Grid width={this.controller.getWidth()} height={this.controller.getHeight()}>
                            {this.state.cells}
                        </Grid>
                        <ControlBanner clearPuzzle={this.clearPuzzle} revealPuzzle={this.revealPuzzle} />
                    </div>
                    <div>
                        <ClueSection
                            acrossClues={this.controller.clues[Direction.Across]}
                            downClues={this.controller.clues[Direction.Down]}
                            focusedClue={this.controller.getFocusedClue()}
                            handleClick={this.handleClueClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
