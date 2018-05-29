import { AppRegistry } from 'react-native';
import AppStack from './screen/Router'
import React, { Component } from 'react';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducer'
import {
  Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View,
  Image, Dimensions, TextInput, StatusBar
} from 'react-native';


class BigScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Provider store = {createStore(reducer)}>
                <AppStack/>
            </Provider>
        )
    }
}
AppRegistry.registerComponent('QR', () => BigScreen);
