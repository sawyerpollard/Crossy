import React from 'react';
import ReactDOM from 'react-dom';
import Crossy from './Crossy';
import CrossyController from './lib/CrossyController';
import fetchIpuz from './lib/fetchIpuz';
import injectCSS from './lib/injectCSS';
import './styles/tailwind.css';

async function loadCrossy() {
    if (!process.env.CROSSY_ROOT || !process.env.CROSSY_ORIGIN) return 'Crossy: Failed to load environment variables.';

    const crossyRoot = document.getElementById(process.env.CROSSY_ROOT)
    if (!crossyRoot) return 'Crossy: Container not found.';

    const ipuzUrl = crossyRoot.getAttribute('ipuzUrl')
    if (!ipuzUrl) return 'Crossy: No ipuzUrl provided.'

    const ipuz = await fetchIpuz(ipuzUrl);
    if (!ipuz) return 'Crossy: Failed to load Ipuz.'

    const cssUrl = new URL('crossy.css', process.env.CROSSY_ORIGIN);
    injectCSS(cssUrl.href);

    ReactDOM.render(
        <React.StrictMode>
            <Crossy controller={new CrossyController(ipuz)} />
        </React.StrictMode>,
        crossyRoot,
    );

    return 'Crossy: Successfully loaded.';
}

const status = await loadCrossy();
console.log(status);
