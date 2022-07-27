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
            tabIndex={-1}
            onClick={() => props.handleClick && props.handleClick(props.row, props.col)}
            className={`relative flex justify-center items-end aspect-square overflow-hidden outline-none border-t border-l border-gray-500 ${bgColor}`}
        >
            <p className="leading-none inline-block text-sm sm:text-2xl">{props.value}</p>
            {props.number !== undefined && <p className="leading-none inline-block p-0.5 text-xs absolute top-0 left-0">{props.number}</p>}
        </div>
    );
}
