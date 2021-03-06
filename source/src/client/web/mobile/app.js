import 'babel-polyfill';
import 'antd-mobile/dist/antd-mobile.min.css';

import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// 1. Initialize
const app = dva({
    history: createHistory(),
    onError(e) {
        console.error(e);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model

// 4. Router
app.router(require('./routes'));

// 5. Start
app.start('#react-root');