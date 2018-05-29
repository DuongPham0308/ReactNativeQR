import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet,
    Image, ListView, RefreshControl, Dimensions, ScrollView, FlatList
} from 'react-native'
import icContact from '../../media/appIcon/contact.png'
import icBack from '../../media/appIcon/back_white.png'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
class ListBorrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleButton: true,
            visibleClear: false,
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
        const {visibleButton,visibleClear} = this.state;
        const { ID } = this.props.navigation.state.params
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ marginTop: 70 }}
                    data={this.state.mang}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, id) => id.toString()}
                    renderItem={({ item }) =>
                        <View style={wrapper}>
                            <View style={productContainer}>
                                <View style={productInfo}>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={txtName}>{item.catalogName}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View >         
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={txtPrice}>Borrowed Date </Text>
                                                <Text style={{ left: 5 }}>{item.borrowed_date}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={txtColor}>Return Date </Text>
                                                <Text style={{ left: 24,paddingTop:7 }}>{item.return_date}</Text>
                                            </View>
                                        </View>
                                        <View style={{ left: 40 }}>
                                            <TouchableOpacity  onPress={() =>{            
                                                    let formData = new FormData();
                                                    formData.append("goiham", 'TraThietBi');
                                                    formData.append("userId",ID)
                                                    formData.append("deviceId",item.deviceId)
                                                    formData.append("catalogId",item.catalogId)
                                                    const self = this
                                                    fetch("http://125.253.123.20/managedevice/group.php", {
                                                        method: "POST",
                                                        headers: {
                                                            'Content-Type': 'multipart/form-data',
                                                        },
                                                        body: formData,
                                                    }).then((response) => { console.log(response); return response._bodyText; })
                                                        .then((response) =>{   
                                                                debugger                                                        
                                                                var arrStr2 = response.split(/[:}]/);
                                                                var response2 =arrStr2[1].trim()
                                                                if(response2 == "true")
                                                                {
                                                                    let formData = new FormData();
                                                                formData.append("goiham", 'LayDanhSachTBDaMuon');
                                                                formData.append("userId",ID)
                                                                const self = this
                                                                fetch("http://125.253.123.20/managedevice/group.php", {
                                                                    method: "POST",
                                                                    headers: {
                                                                        'Content-Type': 'multipart/form-data',
                                                                    },
                                                                    body: formData,
                                                                }).then((response) => { console.log(response); return response.json(); })
                                                                    .then((response) =>
                                                                        
                                                                        this.setState({mang: response.DANHSACHSANPHAMDAMUON })
                                                                        
                                                                    )
                                                                    alert("Request sent")
                                                                }else {
                                                                    alert("FAILED")
                                                                }
                                                        })                                                        
                                                       }}>
                                                <Text style={productImage}>RETURN EQUIPMENT</Text>
                                            </TouchableOpacity>
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
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Borrow List</Text>
                    </View>
                </View>
            </View>
        );
    }
    componentDidMount() {
        const { ID } = this.props.navigation.state.params
        
        let formData = new FormData();
        formData.append("goiham", 'LayDanhSachTBDaMuon');
        formData.append("userId",ID)
        const self = this
        fetch("http://125.253.123.20/managedevice/group.php", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => { console.log(response); return response.json(); })
            .then((response) =>
                this.setState({ mang: response.DANHSACHSANPHAMDAMUON })
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBDBD8'
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        marginLeft:10,
        marginRight:10
        //margin: 10,
        //paddingHorizontal: 2
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1,
        marginLeft: 10
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
        height: 55,
        backgroundColor: '#C65555',
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1,

    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: -2,
        paddingBottom: 10
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#235261',
        fontWeight: 'bold',
        paddingLeft: 2.5,
        
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
        paddingLeft: 2.5,
        paddingTop: 7
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 11
    }
});
const mapStateToProps = (state) => {
    return {
        numberCart: state.numberCart,
        dataSearch: state.dataSearch
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveCart: (data) => dispatch(saveCart(data)),
        saveDataSearch: (data) => dispatch(saveDataSearch(data))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ListBorrow)