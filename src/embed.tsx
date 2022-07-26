import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import Crossy from './Crossy';
import CrossyController from './lib/CrossyController';
import fetchIpuz from './lib/fetchIpuz';
import injectCSS from './lib/injectCSS';

async function loadCrossy() {
    const crossyContainer = document.getElementById('crossy')
    if (!crossyContainer) return 'Crossy: Container not found.';

    const ipuzUrl = crossyContainer.getAttribute('ipuzUrl')
    if (!ipuzUrl) return 'Crossy: No ipuzUrl provided.'

    const ipuz = await fetchIpuz(ipuzUrl);
    if (!ipuz) return 'Crossy: Failed to load Ipuz.'

    ReactDOM.render(
        <React.StrictMode>
            <main className="max-h-screen container overflow-scroll mx-auto p-4">
                <Crossy controller={new CrossyController(ipuz)} />
            </main>
        </React.StrictMode>,
        crossyContainer,
    );

    injectCSS('/crossy.css');

    return 'Crossy: Successfully loaded.';
}

const status = await loadCrossy();
console.log(status);
