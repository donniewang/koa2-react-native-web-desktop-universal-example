/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry
} from 'react-native';

import sourcelib from 'source-lib';

const App = sourcelib.client.native.test1.containers.App;

AppRegistry.registerComponent('test1', () => App);
