import React from 'react';
import ReactDOM from 'react-dom';
import Crossy from './Crossy';
import CrossyController from './lib/CrossyController';
import { fetchIpuz, cellsFromIpuz, cluesFromIpuz } from './lib/parser';
import injectCSS from './lib/injectCSS';
import './styles/tailwind.css';

async function loadCrossy() {
    if (!process.env.CROSSY_ROOT || !process.env.CROSSY_ORIGIN) return 'Crossy: Failed to load environment variables.';

    const crossyRoot = document.getElementById(process.env.CROSSY_ROOT)
    if (!crossyRoot) return 'Crossy: Container not found.';

    const ipuzUrl = crossyRoot.getAttribute('ipuzUrl')
    if (!ipuzUrl) return 'Crossy: No ipuzUrl provided.'

    const cssUrl = new URL('crossy.css', process.env.CROSSY_ORIGIN);
    injectCSS(cssUrl.href);

    try {
        const ipuz = await fetchIpuz(ipuzUrl);
        const cells = cellsFromIpuz(ipuz);
        const clues = cluesFromIpuz(ipuz);

        ReactDOM.render(
            <React.StrictMode>
                <Crossy controller={new CrossyController(cells, clues)} />
            </React.StrictMode>,
            crossyRoot,
        );
    } catch (error: unknown) {
        return 'Crossy: Failed to load Ipuz.';
    }

    return 'Crossy: Successfully loaded.';
}

const status = await loadCrossy();
console.log(status);
