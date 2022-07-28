import React from 'react';
import { Clue, Direction } from '../lib/types';

type ClueBannerProps = {
    clue: Clue;
};

export default function ClueBanner(props: ClueBannerProps) {
    const directionSymbol = props.clue.direction === Direction.Across ? 'A' : 'D';
    return (
        <div className="flex items-center px-4 py-2 bg-blue-200 min-h-[4rem]">
            <p className="font-bold whitespace-nowrap">{props.clue.number + directionSymbol}</p>
            <p className="px-4">{props.clue.message}</p>
        </div>
    );
}
