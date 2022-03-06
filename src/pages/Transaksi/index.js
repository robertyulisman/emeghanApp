import React from 'react';
import {View, StatusBar} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Warna} from '../../utils/Data';
import TabViewApp from './TabViewApp';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import TopBarNew from '../../components/molecules/TopBarNew';

const Transaksi = () => {
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar
        backgroundColor={Warna.primary.satu}
        barStyle="light-content"
      />
      {/* <TopBar title="Pesanan" left /> */}
      <TopBarNew title="Transaksi" single />
      <TabViewApp />

      <BottomNavBar notifActive />
    </View>
  );
};

export default Transaksi;
