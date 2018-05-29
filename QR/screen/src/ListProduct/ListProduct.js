import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet,
    Image, ListView, RefreshControl, Dimensions, ScrollView, FlatList
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import icContact from '../../media/appIcon/contact.png'
import { saveDataSearch } from '../../../actions'
var width = Dimensions.get('window').width;
import { connect } from 'react-redux'
var height = Dimensions.get('window').height;
class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            searchData: [],
            mang: []
        }
    }
    renderSeparator = () =>
        <View
            style={{
                backgroundColor: 'transparent',
                height: 10,
            }}
        />
    render() {
        const {
            container, wrapper,
            productContainer, productImage, productInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail, txtBorrow
        } = styles;
        const { category } = this.props;
        return (
            <FlatList
                style={{ margin: 10 }}
                data={this.props.dataSearch}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) =>
                    <View style={wrapper}>
                        <TouchableOpacity onPress={() => {    
                            this.props.navigation.navigate('ProductDetail', { image: item.image, name: item.catalogName, catalogId: item.catalogId,point:this.props.point,ID:this.props.ID}) }}>
                            <View style={productContainer}>
                                <FastImage style={productImage} source={{ uri: item.image }} resizeMode={FastImage.resizeMode.contain} />
                                <View style={productInfo}>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={txtName}>{item.catalogName}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={txtPrice}>Point </Text>
                                        <Text style={{ paddingLeft: 5 }}>{item.catalogPoint}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={txtColor}>Amount </Text>
                                        <Text style={{ paddingLeft: 5 }}>{item.catalogQuantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
        );
    }
    componentDidMount() {
        let formData = new FormData();
        formData.append("goiham", 'LayDanhSachThietBiKhongDuocMuon');
        const self = this
        fetch("http://125.253.123.20/managedevice/group.php", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => { console.log(response); return response.json(); })
            .then((response) => {
                this.props.saveDataSearch(response.DANHSACHTHIETBIKHONGMUON);
            })
    }
}
const { width } = Dimensions.get('window');
const productWidth = (width - 80) / 2;
const productImageHeight = (productWidth / 540) * 450;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8'
    },
    wrapper: {
        backgroundColor: '#FFF',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,

        //paddingHorizontal:10
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#F0F0F0',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1,
        marginLeft: 10,
    },
    txtBorrow: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        fontSize: 15,
        //justifyContent: 'center',
        paddingLeft: 10,
        paddingTop: 10
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 680
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
        paddingLeft: 2.5
    },
    txtColor: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        paddingLeft: 2.5
    },

});
const mapStateToProps = (state) => {
    return {
        dataSearch: state.dataSearch
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveDataSearch: (data) => dispatch(saveDataSearch(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct)

