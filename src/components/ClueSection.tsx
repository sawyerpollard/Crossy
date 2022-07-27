import React from 'react';
import { Clue } from '../lib/types';

type ClueSectionProps = {
    acrossClues: Clue[];
    downClues: Clue[];
    focusedClue: Clue;
    handleClick: (clue: Clue) => void;
};

export default function ClueSection(props: ClueSectionProps) {
    return (
        <div className="grid h-full grid-cols-2 md:grid-cols-1 gap-2 bg-white z-50">
            <div>
                <p className="block uppercase font-semibold p-2 border-b border-gray-200">Across</p>
                <ClueList clues={props.acrossClues} focusedClue={props.focusedClue} handleClick={props.handleClick} />
            </div>
            <div>
                <p className="block uppercase font-semibold p-2 border-b border-gray-200">Down</p>
                <ClueList clues={props.downClues} focusedClue={props.focusedClue} handleClick={props.handleClick} />
            </div>
        </div>
    );
}

function ClueList(props: { clues: Clue[]; focusedClue: Clue; handleClick: (clue: Clue) => void }) {
    const clueItems = props.clues.map((clue, index) => (
        <ClueItem clue={clue} isFocused={clue === props.focusedClue} handleClick={props.handleClick} key={index} />
    ));
    return <ul className="block max-h-80 text-sm overflow-y-scroll">{clueItems}</ul>;
}

function ClueItem(props: { clue: Clue; isFocused: boolean; handleClick: (clue: Clue) => void }) {
    return (
        <li onClick={() => props.handleClick(props.clue)} className={`p-2 flex align-top cursor-pointer ${props.isFocused && 'bg-blue-200'}`}>
            <p className="font-bold px-2">{props.clue.number}</p>
            <p>{props.clue.message}</p>
        </li>
    );
}
