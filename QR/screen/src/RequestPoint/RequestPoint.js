import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet,Alert } from "react-native";
import { StackNavigator } from 'react-navigation'
import backList from '../../media/appIcon/backBold.png'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
class RequestPoint extends Component {
    constructor(props) {
        super(props);
        this.state = { requestPoint:'',reasonRequest:'' }
    }
    onAccept(){
        Alert.alert(
        'Notice',
        'Accept Successfully',
            [
                { text: 'OK', onPress: () => 
                
                this.props.navigation.goBack()},
                
            ],
            { cancelable: false }
        );
    }
    render() {
        const {
            txtWhy, txtPoint, txtAccept, txtRequest
        } = styles;
        const {requestPoint,reasonRequest} =  this.state
        const { ID } = this.props.navigation.state.params
        return (
            <View style={{ width, height }}>
                <View style={{ backgroundColor: '#dadada', width, height, alignItems: 'center' }}>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: width - 20 }}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                                <Image source={backList} style={{ paddingLeft: 30 }}></Image>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', width: width / 2 + 50 }}>
                                <Text style={txtRequest}>Form Request</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={txtWhy}>Why ?</Text>
                    <View style={{ backgroundColor: '#fff', width: width / 1.2, height: height / 2.5, marginTop: 20,borderRadius:20 }}>
                        <TextInput underlineColorAndroid="transparent" 
                                   onChangeText={(text) => this.setState({ reasonRequest: text })}
                                   value={this.state.reasonRequest}/>
                    </View>
                    <Text style={txtPoint}>Number of Points</Text>
                    <View style={{ backgroundColor: '#fff', width: width / 1.2, height: height / 14, marginTop: 20,borderRadius:20 }}>
                        <TextInput underlineColorAndroid="transparent" 
                                   onChangeText={(text) => this.setState({ requestPoint: text })}
                                   value={this.state.requestPoint}/>
                    </View>
                    <TouchableOpacity onPress={()=>{
              let formData = new FormData();
              debugger
              formData.append("goiham", 'ThemRequestPoint');
              formData.append("userId", ID);
              formData.append("requestPoint", requestPoint);
              formData.append("reasonRequest", reasonRequest);
              const self = this
              fetch("http://125.253.123.20/managedevice/group.php", {
                method: "POST",
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData,
              }).then((response) => {  console.log(response); return response._bodyText })
                .then((response) => {
                  debugger
                   var arrStr1 = response.split(/[:,]/); 
                   var response2 = arrStr1[1].trim().replace("false}","false")
                   if( response2 == "false" )
                   alert("Admin is processing your request...")  
                    
                   else{this.onAccept()}
                    
                }
                )
            }}>
                        <View style={{ backgroundColor: '#235261', width: width / 2.5, height: height / 14, marginTop: 30, justifyContent: 'center', alignItems: 'center',borderRadius:20 }}>
                            <Text style={txtAccept}>ACCEPT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default RequestPoint;
const styles = StyleSheet.create({
    txtWhy: {
        fontFamily: 'Avenir',
        fontSize: 15,
        color: '#235261',
        paddingTop: 25
    },
    txtPoint: {
        fontFamily: 'Avenir',
        fontSize: 15,
        color: '#235261',
        paddingTop: 25
    },
    txtAccept: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',

    },
    txtRequest: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#235261',
        fontWeight: 'bold',

    },
});