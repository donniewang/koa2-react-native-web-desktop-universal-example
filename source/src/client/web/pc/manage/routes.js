import React from 'react';

import { Router, Route, IndexRedirect, history } from 'dva/router';

const cached = {};

const registerModel = (app, model) => {
    if(!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

export default function({ history,app }) {
    return (
        <Router history={ history }>
            <Route path="/manage" getComponent={ (nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./containers/app'));
                }, 'App')
            }}>
            </Route>
        </Router>
    )
}

module.exports = exports['default'];