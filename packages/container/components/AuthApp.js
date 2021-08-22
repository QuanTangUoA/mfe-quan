import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    // a copy of browser history
    const history = useHistory();

    // here is where our container calls the marketing app
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathName }) => {
                const { pathname } = history.location;
                if (pathname !== nextPathName) {
                    history.push(nextPathName);
                }
            },
            onSignIn: () => {
                onSignIn();
            }
        });
        history.listen(onParentNavigate);
    }, [])
    return <div ref={ref} />
}