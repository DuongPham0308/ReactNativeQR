import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet,
    Image, ListView, RefreshControl, Dimensions, ScrollView
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import backgroundDetail from '../../media/appIcon/backgrounddetail.png'
import backList from '../../media/appIcon/back_white.png'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class BorrowDetail extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {
            backDetail, productContainer, productInfo, txtPrice, txtMaterial, lastRowInfo, txtColor, txtBorrow,
            txtAmount, txtPoint, txtMinusPlus, txtConfirm, txtBorrowConfirm, header, txtDay
        } = styles;
        return (
            <View style={{ width, height }}>

                <View style={{ backgroundColor: '#dadada', width, height, alignItems: 'center' }}>
                    <View style={{ width, height: height / 2 }}>
                        <Image source={backgroundDetail} style={backDetail} resizeMode={'cover'}
                        />
                    </View>
                    <View style={{ width: width - 100, height: height / 2 -20, marginTop: height / 2 - 40, backgroundColor: '#fff', position: 'absolute' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width - 100 + 234 }}>
                            <Text style={txtBorrow}>Expire Time </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15,  }}>10th March 2018</Text>
                        </View>
                        <View style={{ height: 3, width: width, backgroundColor: '#dadada', marginTop: 15 }}></View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtAmount}>Amount </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15 }}> 5</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtPoint}>Point </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15 }}> 5</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtPoint}>Info </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15, paddingLeft:7 }}>Loại máy : Máy in CNC</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width, height: 60, position: 'absolute', alignItems: 'center',marginLeft:20, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={backList} style={{ height: 30, width: 30}} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width - 100, height: 60 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>CNC MINI</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    backDetail: {
        width, height: height / 2
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#104E8B',
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtPoint: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingTop: 15
    },
    txtBorrow: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        //justifyContent: 'center',
        paddingLeft: -100,
        paddingTop: 15
    },
    txtDay: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        //justifyContent: 'center',
        paddingLeft: 35,
        paddingTop: 15
    },
    txtAmount: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingTop: 15
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtMinusPlus: {
        width: width - 60 - 80,
        height: height / 15,
        backgroundColor: 'white',
        marginTop: 25,
        marginLeft: 20,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    txtConfirm: {
        width: width - 60 - 80,
        height: height / 15,
        backgroundColor: '#235261',
        marginTop: 25,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBorrowConfirm: {
        color: '#fff',
        fontWeight: 'bold',
        alignItems: 'center'
    }
});
