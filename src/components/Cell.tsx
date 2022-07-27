import React from 'react';

type CellProps = {
    value?: string;
    focused?: boolean;
    highlighted?: boolean;
    number?: number;
    block?: boolean;
    row: number;
    col: number;
    handleClick?: (row: number, col: number) => void;
};

export default function Cell(props: CellProps) {
    let bgColor = 'bg-white';
    if (props.block) {
        bgColor = 'bg-black';
    } else if (props.focused) {
        bgColor = 'bg-yellow-300';
    } else if (props.highlighted) {
        bgColor = 'bg-blue-200';
    }

    return (
        <div
            className={`relative aspect-square overflow-hidden outline-none border-t border-l border-gray-500 ${bgColor}`}
        >
            {props.number && <p className="pointer-events-none absolute top-0 left-0 p-0.5 text-xs leading-none">{props.number}</p>}
            {!props.block && <input
                onClick={() => props.handleClick && props.handleClick(props.row, props.col)}
                tabIndex={-1}
                type="text"
                maxLength={1}
                value={props.value}
                className="w-full h-full text-center text-sm sm:text-2xl selection:bg-transparent touch-manipulation select-none cursor-default outline-none caret-transparent bg-transparent"
            />}
        </div>
    );
}
