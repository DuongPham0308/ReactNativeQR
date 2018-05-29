import React, { Component } from 'react';
import { View, Text, TouchableOpacity,BackHandler,Alert } from "react-native";
import Header from './Header/Header'
import ListProduct from './ListProduct/ListProduct'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

class Search extends Component {
    constructor(props) {
        super(props);

    }
    
    openMenu() {
        const { open } = this.props;
        open();
    }
    render() {
        const { user, ID, point } = this.props

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Header ID={ID} onOpen={this.openMenu.bind(this)} navigation={this.props.bienManHinh} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#DBDBD8' }}>
                    <ListProduct point={point} ID={ID} navigation={this.props.bienManHinh} />
                </View>
            </View>
        );
    }
   
}


const mapStateToProps = (state) => {
    return {
        bienManHinh: state.stack
    }
};

export default (Search)