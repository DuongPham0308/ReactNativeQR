import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet, Keyboard } from 'react-native'
import icQrCode from '../../media/appIcon/qrcode.png'
import icMenu from '../../media/appIcon/icMenu-50.png'
import icSearch from '../../media/appIcon/search50.png'
import icBack from '../../media/appIcon/back.png'
const { height, width } = Dimensions.get('window');
import { connect } from 'react-redux'
import { saveDataSearch } from '../../../actions'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
            visibleDrawer: true,
            visibleClear: false,
        };
    }
    render() {
        const { wrapper, row1, textInput, iconStyleBack, titleStyle, iconStyle2, iconStyleSearch, iconStyleMenu } = styles;
        const { visibleClear, visibleDrawer } = this.state
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <View  >
                        <View style={iconStyleMenu} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={textInput}
                            placeholder="  What do you want to find ?"
                            value={this.state.txtSearch}
                            onChangeText={text => this.setState({ txtSearch: text })}
                        />
                        <TouchableOpacity style={iconStyle2} onPress={() => {
                            if (this.state.txtSearch != "") {
                                let formData = new FormData();
                                formData.append("goiham", 'TimKiemSanPhamTheoTenSP');
                                formData.append("catalogName", this.state.txtSearch);
                                const self = this
                                fetch("http://125.253.123.20/managedevice/group.php", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    body: formData,
                                }).then((response) => { console.log(response); return response.json(); })
                                    .then((response) => {
                                        this.setState({ visibleClear: true, visibleDrawer: false })
                                        this.props.saveDataSearch(response.DANHSACHSANPHAM);
                                    })
                                this.setState({ txtSearch: "" })
                                Keyboard.dismiss();
                            } else {
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
                                        this.setState({ visibleClear: false, visibleDrawer: true })
                                        this.props.saveDataSearch(response.DANHSACHTHIETBIKHONGMUON);
                                    })
                            }
                        }} >
                            <Image source={icSearch} style={iconStyleSearch} />
                        </TouchableOpacity>
                        {visibleDrawer ? <TouchableOpacity visible={visibleClear} style={{ position: 'absolute', marginLeft: -50, marginTop: 0 }}
                            onPress={this.props.onOpen} >
                            <Image source={icMenu} style={iconStyleMenu} />
                        </TouchableOpacity> : null}
                        {visibleClear ? <TouchableOpacity style={{ position: 'absolute', marginLeft: -50, marginTop: 2 }} onPress={() => {
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
                                    this.setState({ txtSearch: "", visibleClear: false, visibleDrawer: true })
                                    this.props.saveDataSearch(response.DANHSACHTHIETBIKHONGMUON);
                                })
                        }}>
                            <Image source={icBack} style={iconStyleBack} />
                        </TouchableOpacity> : null}
                    </View>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('QRcode')}>
                        <Image source={icQrCode} style={iconStyle} />
                    </TouchableOpacity> */}

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
        justifyContent: 'center'
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textInput: {
        width: width / 1.3 ,
        height: height / 17,
        backgroundColor: '#FFF',
        borderRadius: 50,
        marginLeft: 5
    },
    iconStyleBack: {
        width: 35,
        height: 35,
        marginLeft: 5,
    },
    iconStyleMenu: {
        width: 35,
        height: 35,
        marginLeft: 5,
        marginRight: 0,
    },
    iconStyleSearch: {
        width: 22,
        height: 25,
        marginLeft: 15,
        marginTop: 5,
        position:'absolute'
    },
    iconStyle2: {
        width: 40,
        height: 35, position: 'absolute',
        marginLeft: width / 1.4 - 30 
    },
    titleStyle: {
        color: '#000',
        fontFamily: 'Avenir',
        fontSize: 20,
        justifyContent: 'center',

    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Header)

