import React, { Component } from 'react';
import { Toast,Flex } from 'antd-mobile';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class App extends Component {
    componentDidUpdate() {
        if(this.props.loading.global) {
            Toast.loading('loading...', 0, null, true);
        } else {
            setTimeout(function () {
                Toast.hide();
            },600);
        }
    }
    render() {
        return (
            <div className="app">
                <ReactCSSTransitionGroup
                    component="div"
                    className="transition"
                    transitionName="right"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {/* {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })} */}
                    <div>hello world</div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}