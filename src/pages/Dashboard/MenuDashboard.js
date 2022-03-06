import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Warna} from '../../utils/Data';
import MenuItem from './MenuItem';

const MenuDashboard = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <View style={{flexDirection: 'row'}}>
        <MenuItem
          title="Pembelian"
          source={require('../../assets/menu/pembelian.png')}
          onPress={() => navigation.navigate('AllMenu', {type: 'pembelian'})}
        />
        <MenuItem
          title="Pembayaran"
          source={require('../../assets/menu/pembayaran.png')}
          onPress={() => navigation.navigate('AllMenu', {type: 'pembayaran'})}
        />
        <MenuItem
          title="Toko"
          source={require('../../assets/menu/toko.png')}
          onPress={() => navigation.navigate('Toko')}
        />
        <MenuItem
          title="Futsal"
          source={require('../../assets/menu/futsal.png')}
          onPress={() => navigation.navigate('Futsal')}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <MenuItem
          title="Hotel"
          source={require('../../assets/menu/hotel.png')}
          onPress={() => navigation.navigate('Hotel')}
        />
        <MenuItem
          title="Wa Direct"
          source={require('../../assets/menu/waDirect.png')}
          onPress={() => navigation.navigate('WaDirect')}
        />
        <MenuItem
          title="Cek Ongkir"
          source={require('../../assets/menu/cekOngkir.png')}
          onPress={() => navigation.navigate('CekOngkir')}
        />
        <MenuItem
          title="Lain2"
          source={require('../../assets/menu/lain2.png')}
          onPress={() => navigation.navigate('AllMenu', {type: 'all'})}
        />
      </View>
    </View>
  );
};

export default withNavigation(MenuDashboard);
