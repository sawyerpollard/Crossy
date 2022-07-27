import React from 'react';

type ControlBannerProps = {
    clearPuzzle: () => void;
    revealPuzzle: () => void;
};

function ControlButton(props: { label: string; handleClick: () => void }) {
    return (
        <button className="bg-gray-200 px-2 py-2" onClick={props.handleClick} type="button">
            {props.label}
        </button>
    );
}

export default function ControlBanner(props: ControlBannerProps) {
    return (
        <div className="flex gap-4 text-lg">
            <ControlButton label="Clear Puzzle" handleClick={props.clearPuzzle} />
            <ControlButton label="Reveal Puzzle" handleClick={props.revealPuzzle} />
        </div>
    );
}
