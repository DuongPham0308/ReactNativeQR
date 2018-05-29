import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window');
import backList from '../../media/appIcon/backBlackWhite.png'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: ''
        };
    }
    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')} >
                        <Image source={backList} style={iconStyle} />
                    </TouchableOpacity>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={textInput}
                        placeholder="What do you want to find ?"
                    //value={this.state.txtSearch}
                    //onChangeText={text => this.setState({ txtSearch: text })}
                    //onFocus={() => global.gotoSearch()}
                    //onSubmitEditing={this.onSearch.bind(this)}
                    />
                   
                </View>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        height: height / 8,
        backgroundColor: '#f3f3f3',
        padding: 10,
        justifyContent: 'space-around'
    },
    row1: {

        flexDirection: 'row',
     
    },
    textInput: {
        width: width / 1.2,
        height: height / 17,
        backgroundColor: '#FFF',
        borderRadius: 500
    },
    iconStyle: {
        width: 30,
        height: 30,
        marginTop:3
    },
    titleStyle: {
        color: '#000',
        fontFamily: 'Avenir',
        fontSize: 20,
        justifyContent: 'center'
    }
});