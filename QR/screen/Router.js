import React, { Component } from 'react';
import {
    StackNavigator, DrawerNavigator, DrawerItems
} from 'react-navigation';
import {
    Image,
    Text,
    View,
} from 'react-native';

import Login from './src/Login'
import Search from './src/Search'
import Main from './src/Main'
import ListBorrow from './src/ListBorrow/ListBorrow'
import ProductDetail from './src/ListProduct/ProductDetail'
import ListProduct from './src/ListProduct/ListProduct';
import BorrowDetail from './src/ListBorrow/BorrowDetail'
import Borrow from './src/Borrow'
import RequestPoint from './src/RequestPoint/RequestPoint'
import ListReserve from './src/ListReserve'
import QRcode from './src/QRcode'
const AppStack = StackNavigator({
    Login: { screen: Login },
    Search: { screen: Search },
    Main :{screen: Main},
    ListBorrow :{screen: ListBorrow},
    ProductDetail:{screen: ProductDetail},
    ListProduct:{screen:ListProduct},
    BorrowDetail:{screen:BorrowDetail},
    Borrow:{screen:Borrow},
    RequestPoint:{screen:RequestPoint},
    ListReserve:{screen:ListReserve},
    QRcode:{screen:QRcode}
},
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        }
    }
);

export default AppStack