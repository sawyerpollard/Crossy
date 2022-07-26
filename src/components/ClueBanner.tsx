import React from 'react';
import { Clue, Direction } from '../lib/types';

type ClueBannerProps = {
    clue: Clue;
};

export default function ClueBanner(props: ClueBannerProps) {
    const directionSymbol = props.clue.direction === Direction.Across ? 'A' : 'D';
    return (
        <div className="bg-blue-200 py-4 text-lg mb-4 flex align-top">
            <p className="font-bold px-4">{props.clue.number + directionSymbol}</p>
            <p>{props.clue.message}</p>
        </div>
    );
}
