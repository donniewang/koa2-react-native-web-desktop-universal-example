import React from 'react';

import { Router, Route, Switch } from 'dva/router';

import dynamic from 'dva/dynamic';

export default function({ history,app }) {

    const App = dynamic({
        app,
        models:() => [
            //import('./models/users'),
        ],
        component: () => import('./containers/app'),
    });

    return (
        <Router history={ history }>
            <Route exact path="/manage" component={ App }></Route>
        </Router>
    );
}

module.exports = exports['default'];