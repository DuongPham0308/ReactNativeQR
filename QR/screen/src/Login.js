/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View,Keyboard,
  Image, Dimensions, TextInput,StatusBar,AsyncStorage,KeyboardAvoidingView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PC from '../media/appIcon/PC.png'
import background from '../media/appIcon/backgrounddetail.png'
import logo from '../media/appIcon/logoPCwhite.png'
import { saveNavigation ,savePoint} from '../../actions'
import { connect } from 'react-redux'
StatusBar.setHidden(true);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.id = "";
    this.point = "";
    this.name = "";

  }
  componentWillMount() {
    this.get()
  }
  save = async()=>{
    try{
      await AsyncStorage.setItem("username",this.name);
      await AsyncStorage.setItem("password",this.state.password);   
      await AsyncStorage.setItem("point",this.point);
      await AsyncStorage.setItem("id",this.id);  
    }
    catch(e){
      console.log(e)
    }
  }
  get = async()=>{
    try{
      var userCheck = await AsyncStorage.getItem("username")
      var passwordCheck = await AsyncStorage.getItem("password")
      var id = await AsyncStorage.getItem("id")
      var point = await AsyncStorage.getItem("point")
      this.props.savePoint(point)
      if (userCheck!= "" && passwordCheck!= "" && userCheck!= null) {
        this.props.navigation.navigate('Main', { user: userCheck, ID: id, point: point })
      }
    }
    catch(e){
      console.log(e)
    }
  }
  render() {
    console.log(this.props);
    const { width, height } = Dimensions.get('window')
    const { username, password } = this.state
    //thư viện Dimemsions hỗ trợ việc chia hình ảnh theo tỉ lệ màn hình với 2 biến width,height
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)' }} >
        <Image resizeMode={'stretch'} source={background} style={{ backgroundColor: '#fff', width, height, position: 'absolute' }} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={{ width: width - 160, height: height / 5, marginTop: 100 }} resizeMode={'stretch'} source={logo} />
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-between', marginBottom: 35 }}>
          <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: 'rgba(255,255,255,0.4)', width: width - 80, height: height / 5, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', width: width - 80, height: height / 5 / 2 - 1, alignItems: 'center' }}>
              <Image style={{ padding: 5, width: 40, height: 40 }} resizeMode='stretch' source={require('../../images/user72.png')} />
              <TextInput
                placeholder='Username'
                placeholderTextColor={'#fff'}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{ height: 40, flex: 1 }}
                onChangeText={(text) => this.setState({ username: text })}
                value={this.state.username}
              />
            </View>
            <View style={{ backgroundColor: 'black', width: width - 120 - height / 5 / 2 / 2, height: 2, left: 40 }} />
            <View style={{ flexDirection: 'row', width: width - 80, height: height / 5 / 2 - 1, alignItems: 'center' }}>
              <Image style={{ padding: 5, width: 40, height: 40 }} resizeMode='stretch' source={require('../../images/lock72.png')} />
              <TextInput
                secureTextEntry={true}
                placeholder='Password'
                placeholderTextColor={'#fff'}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{ height: 40, flex: 1 }}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={{ position: 'absolute', left: width - 40 - height / 5 / 2 / 2, top: height / 5 / 2 / 2, backgroundColor: 'transparent', borderRadius: height / 5 / 2 }}>
            <TouchableOpacity onPress={() => {
              let formData = new FormData();
              formData.append("goiham", 'KiemTraDangNhap');
              formData.append("userId", username);
              formData.append("userPassword", password);
              const self = this
              fetch("http://125.253.123.20/managedevice/group.php", {
                method: "POST",
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData,

              }).then((response) => {  console.log(response); return response._bodyText })
                .then((response) => {
                  
                  var arrStr1 = response.split(/[:,]/);
                  var arrStr2 = response.split(/[:}]/);
                  if (arrStr1[1].trim() == "true") {
                    var a = arrStr1[3].trim().slice(1, arrStr1[3].length - 2);
                    var b = arrStr1[7].trim().slice(1, arrStr1[7].length - 3);
                    var c = arrStr1[5].trim().slice(1, arrStr1[5].length - 2);
                    this.name = a;
                    this.point = b;
                    this.id = c;
                    this.save()
                    this.props.savePoint(this.point)
                    this.props.navigation.navigate('Main', { user: a, ID: c, point: b })
                    Keyboard.dismiss();
                    this.setState({username:""})
                    this.setState({password:""})
                  }
                  else { alert("Wrong username or password") }
                }
                )
            }
            }>
              <Image style={{ width: height / 5 / 2, height: height / 5 / 2 }} resizeMode='stretch' source={require('../../images/loginbutton.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
            {/* <TouchableOpacity onPress={() => {
              alert("OK")
            }}>
              <Text style={{ color: 'white' }}> Forgot Password ?</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.props.saveBien(this.props.navigation)
  }
}
const mapStateToProps = (state) => {
  return {
    bienManHinh: state.stack,
    savePointData: state.savePointData
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveBien: (data) => dispatch(saveNavigation(data)),
    savePoint: (point) => dispatch(savePoint(point))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)


