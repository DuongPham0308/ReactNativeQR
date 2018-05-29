import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import HeaderBorrow from './Header/HeaderBorrow'
import ListBorrow from './ListBorrow/ListBorrow'
import { StackNavigator } from 'react-navigation'
class Borrow extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
               
                <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                    <ListBorrow navigation={this.props.navigation}  />
                </View>
            </View>
        );
    }
}

export default Borrow;