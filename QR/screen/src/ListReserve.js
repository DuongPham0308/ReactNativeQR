import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet,
    Image, ListView, RefreshControl, Dimensions, ScrollView, FlatList, AsyncStorage
} from 'react-native'
import icContact from '../media/appIcon/contact.png'
import icBack from '../media/appIcon/back_white.png'
import FastImage from 'react-native-fast-image'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
class ListReserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mang: [
            ]
        }
    }
    renderSeparator = () =>
        <View
            style={{
                backgroundColor: 'transparent',
                height: 10,
            }}
        />

    saveDataSaveCart = async (data) => {
        try {
            await AsyncStorage.setItem("saveCart", JSON.stringify(data));
        }
        catch (e) {
            console.log(e)
        }
    }
    save = async(point)=>{
        try{
          await AsyncStorage.setItem("point",point);
        }
        catch(e){
          console.log(e)
        }
      }
    render() {
        const {
            container, wrapper,
            productContainer, productImage, productInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail, txtBorrow, btnBorrow, btnCancel
        } = styles;
        const { category, numberCart } = this.props;
        const { ID, catalogId } = this.props.navigation.state.params
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ marginTop: 70 }}
                    data={numberCart}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, id) => id.toString()}
                    renderItem={({ item, index }) =>
                        <View style={wrapper}>
                            <View style={productContainer}>
                                <FastImage style={productImage} source={{ uri: item.image }} resizeMode={FastImage.resizeMode.contain} />
                                <View style={productInfo}>
                                    <View>
                                        <Text style={txtName}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={txtMaterial}>Borrow Day </Text>
                                            <Text style={{ paddingLeft: 5, }} >{item.date}</Text>
                                        </View >
                                        <View style={{ marginTop: 10 }} >
                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate('QRcode', { ID: ID, catalogId: item.catalogId, index })
                                                }
                                                }>
                                                    <Text style={btnBorrow}>BORROW </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                   
                                                    let formData = new FormData();
                                                    formData.append("goiham", 'XoaTBDaDat');
                                                    formData.append("catalogId", item.catalogId);
                                                    formData.append("userId", ID);
                                                    const self = this
                                                    fetch("http://125.253.123.20/managedevice/group.php", {
                                                        method: "POST",
                                                        headers: {
                                                            'Content-Type': 'multipart/form-data',
                                                        },
                                                        body: formData,
                                                    }).then((response) => { console.log(response); return response._bodyText; })
                                                        .then((response) => {
                                                       
                                                            var arrStr2 = response.split(/[:}]/);
                                                            var response2 = arrStr2[1].trim()
                                                            if (response2 == "true") 
                                                            {
                                                                var arrayTemp = this.props.numberCart
                                                                arrayTemp.map((data, vitri) => {
                                                                    if (vitri == index) {
                                                                        arrayTemp.splice(index, 1) // xóa 1 phần tử tại ví trí đó
                                                                    }
                                                                })
                                                                var arrayData = [...arrayTemp]
                                                                this.saveDataSaveCart(arrayData)
                                                                // chuẩn ES6, gán những phần tử trong arrayTemp vào arrayData
                                                                this.props.saveCart(arrayData)
                                                                var sumPoint = parseInt(this.props.savePointData)
                                                                sumPoint = sumPoint + parseInt(item.catalogPoint)
                                                                
                                                                this.save(sumPoint+"")
                                                                this.props.savePoint(sumPoint)
                                                            }
                                                            else{alert("FAILED")}
                                                        })
                                                }}>
                                                    <Text style={btnCancel}>CANCEL</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
                <View style={{ width, height: 60, position: 'absolute', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <TouchableOpacity style={{ marginRight: 50 }} onPress={() => this.props.navigation.goBack()}>
                        <Image source={icBack} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width - 100, height: 60, right: 40 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Reserve List</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8',
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingHorizontal: 10,
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    txtBorrow: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361,

    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: -2,
        paddingTop: 10,
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        paddingLeft: 2.5
    },
    txtMaterial: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        paddingLeft: 0,
    },
    txtColor: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        paddingLeft: 2.5
    },
    btnBorrow: {
        backgroundColor: '#235261',
        width: 110,
        height: 35,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    btnCancel: {
        backgroundColor: 'red',
        width: 110,
        height: 35,
        left: 10,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 25,
        paddingTop: 8
    }
});
const mapStateToProps = (state) => {
    return {
        numberCart: state.numberCart,
        dataSearch: state.dataSearch,
        savePointData: state.savePointData

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveCart: (data) => dispatch(saveCart(data)),
        saveDataSearch: (data) => dispatch(saveDataSearch(data)),
        savePoint: (point) => dispatch(savePoint(point))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ListReserve)
