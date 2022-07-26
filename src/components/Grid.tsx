import React from 'react';

type GridProps = { width: number; height: number; children: JSX.Element[] };
export default function Grid(props: GridProps) {
    const style: React.CSSProperties = {
        gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    };

    return (
        <div className="inline-block w-full aspect-square border-2 border-black">
            <div style={style} className="inline-grid w-full h-full border-b border-r border-gray-500 cursor-default select-none">
                {props.children}
            </div>
        </div>
    );
}
