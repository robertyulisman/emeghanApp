import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Warna} from '../../utils/Data';
import TabViewAppGuru from './TabViewAppGuru';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import TopBarNew from '../../components/molecules/TopBarNew';
// import TopBarNew from '../../components/molecules/TopBarNew';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileUser} from '../../config/redux/actions/profileActions';

const CartGuru2 = () => {
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar title="Pesanan" left /> */}
      <TopBarNew title="Pembelajaran" single />

      <TabViewAppGuru />
      <BottomNavBar belajarActive />
    </View>
  );
};

export default CartGuru2;
