import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, AsyncStorage, BackHandler,
    Image, ListView, RefreshControl, Dimensions, ScrollView
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import backgroundDetail from '../../media/appIcon/backgrounddetail.png'
import backList from '../../media/appIcon/back_white.png'
import cart from '../../media/appIcon/basket.png'
import { connect } from 'react-redux'
import { saveQuantity } from '../../../actions';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: "",
            name: "",
            chitietthietbi: []
        }
    }
    load = async () => {
        try {
            var saveCart = await AsyncStorage.getItem("saveCart")
            var jsonData = []
            if (saveCart != "" && saveCart != null)
                jsonData = JSON.parse(saveCart)
            this.props.saveCart(jsonData)
        }
        catch (e) {
            console.log(e)
        }
    }
    save = async (point) => {
        try {
            await AsyncStorage.setItem("point", point);
        }
        catch (e) {
            console.log(e)
        }
    }
    saveDataSaveCart = async (data) => {
        try {
            await AsyncStorage.setItem("saveCart", JSON.stringify(data));
        }
        catch (e) {
            console.log(e)
        }
    }
    componentWillMount() {
        this.load()
    }
    render() {
        const { image, name, catalogId, point, ID } = this.props.navigation.state.params
        const { numberCart } = this.props
        const {
            backDetail, productContainer, productInfo, txtPrice, txtMaterial, lastRowInfo, txtColor, txtBorrow,
            txtAmount, txtPoint, txtMinusPlus, txtConfirm, txtBorrowConfirm, header, txtDay
        } = styles;
        const { chitietthietbi } = this.state
        return (
            <View style={{ width, height }}>

                <View style={{ backgroundColor: '#dadada', width, height, alignItems: 'center' }}>
                    <View style={{ width, height: height / 2 }}>
                        <Image source={{ uri: image }} style={backDetail} resizeMode={'cover'}
                        />
                    </View>
                    <View style={{ width: width - 100, height: height / 2 - 20, marginTop: height / 2 - 40, backgroundColor: '#fff', position: 'absolute' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width - 100 + 270 }}>
                            <Text style={txtBorrow}>Borrowing Duration </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15, paddingLeft: 7 }}>{chitietthietbi.length != 0 ? chitietthietbi[0].borrow_days : ""} days</Text>
                        </View>
                        <View style={{ height: 3, width: width, backgroundColor: '#dadada', marginTop: 15 }}></View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtAmount}>Amount </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15 }}> {chitietthietbi.length != 0 ? chitietthietbi[0].catalogQuantity : ""}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtPoint}>Point </Text>
                            <Text style={{ width, paddingTop: 15, fontSize: 15, left: 18 }}>{chitietthietbi.length != 0 ? chitietthietbi[0].catalogPoint : ""}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: width - 100 + 270 }}>
                            <Text style={txtPoint}>Info </Text>
                            <ScrollView style={{ marginTop: 15, height: height / 9 }}>
                                <Text style={{ width: width / 2, fontSize: 15, paddingLeft: 31 }}>{chitietthietbi.length != 0 ? chitietthietbi[0].catalogInfo : ""}</Text>
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={() => {
                            var userPoint = parseInt(this.props.savePointData)
                            var thietbiPoint = parseInt(chitietthietbi[0].catalogPoint)
                            var soLuongSanPham = parseInt(chitietthietbi[0].catalogQuantity)
                            if (userPoint >= thietbiPoint && soLuongSanPham > 0) {
                                let formData = new FormData();
                                formData.append("goiham", 'ThemPhieuDatThietBi');
                                formData.append("userId", (ID));
                                formData.append("catalogId", (catalogId));
                                const self = this
                                fetch("http://125.253.123.20/managedevice/group.php", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    body: formData,
                                }).then((response) => { console.log(response); return response._bodyText })
                                    .then((response) => {
                                        var arrStr2 = response.split(/[:}]/);
                                        var response2 = arrStr2[1].trim()
                                        if (response2 == "true") {
                                            var cartList = this.props.numberCart;
                                            var listFullProduct = this.props.dataSearch;
                                            var detaildata = listFullProduct.find((value) => value.catalogId == catalogId)
                                            var today = new Date();
                                            var dd = today.getDate();
                                            var mm = today.getMonth() + 1;
                                            var yyyy = today.getFullYear();
                                            if (dd < 10) {
                                                dd = '0' + dd
                                            }
                                            if (mm < 10) {
                                                mm = '0' + mm
                                            }
                                            today = dd + '/' + mm + '/' + yyyy;
                                            detaildata.date = today;
                                            detaildata.image = image;
                                            detaildata.name = name;
                                            var temp = []
                                            cartList.map((value) => {
                                                temp.push(value)
                                            })
                                            temp.push(detaildata);
                                            this.saveDataSaveCart(temp)
                                            this.props.saveCart(temp)
                                            var sumPoint = parseInt(this.props.savePointData)
                                            sumPoint = sumPoint - thietbiPoint

                                            this.save(sumPoint + "")
                                            this.props.savePoint(sumPoint)

                                            var sumQuantity = parseInt(this.props.saveQuantityData)
                                            sumQuantity = sumQuantity - soLuongSanPham


                                            this.props.saveQuantity(sumQuantity)
                                            alert("Reserve successfully")
                                        }
                                        else {
                                            alert("FAILED")
                                        }
                                    })
                            }
                            else { alert("You don't have enough point to borrow or the device is out of stock") }
                        }}>
                            <View style={txtConfirm}>
                                <Text style={txtBorrowConfirm}>RESERVE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width, height: 60, position: 'absolute', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={backList} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: width - 100, height: 60 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {

                        this.props.navigation.navigate('ListReserve', { ID: ID, catalogId: catalogId })
                    }}>
                        <View>
                            <Image source={cart} style={{ width: 40, height: 40, }} />
                            <View style={{ backgroundColor: 'orange', borderRadius: 15, position: 'absolute', width: 15, height: 15, marginTop: 10, marginLeft: 25, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, color: 'white', fontWeight: 'bold' }}>{numberCart.length}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    componentDidMount() {
        const { catalogId } = this.props.navigation.state.params
        let formData = new FormData();
        formData.append("goiham", 'LaySanPhamChiTietTheoMaSP');
        formData.append("catalogId", catalogId);
        const self = this
        fetch("http://125.253.123.20/managedevice/group.php", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => { console.log(response); return response.json(); })
            .then((response) => {
                console.log(response)
                this.setState({ chitietthietbi: response.CHITIETTHIETBI })
            }
            )
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
        paddingLeft: 15,
        paddingTop: 15
    },
    txtDay: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
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

const mapStateToProps = (state) => {
    return {
        numberCart: state.numberCart,
        dataSearch: state.dataSearch,
        savePointData: state.savePointData,
        saveQuantityData: state.saveQuantityData
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveCart: (data) => dispatch(saveCart(data)),
        saveDataSearch: (data) => dispatch(saveDataSearch(data)),
        savePoint: (point) => dispatch(savePoint(point)),
        saveQuantity: (quantity) => dispatch(saveQuantity(quantity))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
