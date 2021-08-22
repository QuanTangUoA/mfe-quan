import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    // execute the param whenever the path gets changed
    if (onNavigate) history.listen(onNavigate);

    // render the first param to the second param
    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathName }) {
            const { pathname } = history.location;
            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if (devRoot) {
        // when in development mode, use browswer history, cuz it'll make 
        // our development much easier
        const defaultHistory = createBrowserHistory();
        mount(devRoot, { defaultHistory });
    }
}

export { mount };