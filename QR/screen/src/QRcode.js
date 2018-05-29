import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,AsyncStorage,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from 'react-redux'
class QRcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text:""
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
  onSuccess(e) {
    const { ID,catalogId ,index} = this.props.navigation.state.params

    this.setState({
      text:e.data
    })
     let formData = new FormData();
     console.log(catalogId + "       "+ ID+"       "+e.data)
     formData.append("goiham", 'MuonThietBi');
     formData.append("deviceId",(e.data));
     formData.append("userId", (ID));
     formData.append("catalogId", (catalogId));
     const self = this
     fetch("http://125.253.123.20/managedevice/group.php", {
         method: "POST",
         headers: {
             'Content-Type': 'multipart/form-data',
         },
         body: formData,
     }).then((response) => {console.log(response); return response._bodyText })
         .then((response) => {  
          
           var arrStr2 = response.split(/[:}]/);
           var response2 =arrStr2[1].trim()
                if (response2 == "true") {
                 var arrayTemp = []
                 self.props.numberCart.map((value,index2) => {
                   if (index2!=index)
                   arrayTemp.push(value)
                 })
                 var arrayData = [...arrayTemp]
                 self.saveDataSaveCart(arrayData)
                 // chuẩn ES6, gán những phần tử trong arrayTemp vào arrayData
                 self.props.saveCart(arrayData)
                 alert("Borrow successfully")
                 self.props.navigation.goBack()
                }
                else{                
                  alert("FAILED")
                  self.props.navigation.goBack()
              }               
         }
         )
  }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>{this.state.text}</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={ 
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(QRcode)
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});