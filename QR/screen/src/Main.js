import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert
} from 'react-native';
import Drawer from 'react-native-drawer';
import { StackNavigator } from 'react-navigation'
import Menu from './Menu';
import Search from './Search';
import Borrow from './Borrow'
import { connect } from 'react-redux'

class Main extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props)
    this.logic = true;
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  onBackButtonPressAndroid = () => {
    if (this.logic) {
      this.logic = false;
      Alert.alert(
            'Exit App',
            'Exiting the application?', [{
              text: 'Cancel',
              onPress: () =>      { this.logic = true;}
              ,
              style: 'cancel'
            }, {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
            },], {
              cancelable: false
            }
          )
      return true;
    } else {
      return false;
    }
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  closeControlPanel = () => {
    this.drawer.close()
  };
  openControlPanel = () => {
    this.drawer.open()
  };
  render() {
    const { user, ID, point } = this.props.navigation.state.params
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Menu drawer={this.closeControlPanel} navigation2={this.props.navigation} navigation = {this.props.bienManHinh}/>}
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        type="overlay"
        tapToClose={true}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <Search user={user} ID={ID} point={point} navigation={this.props.navigation} bienManHinh={this.props.bienManHinh} open={this.openControlPanel.bind(this)} />

      </Drawer>

    );
  }
  // componentWillMount(){
  //   BackHandler.addEventListener('hardwareBackPress', function() {
  //     BackHandler.exitApp();
  //   });
  //   }
}
const mapStateToProps = (state) => {
  return {
    bienManHinh: state.stack
  }
};

export default connect(mapStateToProps)(Main)


