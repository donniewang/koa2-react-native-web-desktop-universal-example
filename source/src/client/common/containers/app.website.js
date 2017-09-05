import React, { Component } from 'react';

export default class App extends Component {
    componentDidUpdate() {
        if(this.props.loading.global) {
        } else {
        }
    }
    render() {
        return (
            <div className="app">
                <div>hello world</div>
            </div>
        )
    }
}