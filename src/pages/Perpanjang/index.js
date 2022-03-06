import React from 'react';
import {View, Text} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import {withNavigation} from 'react-navigation';
import {apiUrl, Warna} from '../../utils/Data';
import DetailPesanan from '../../components/Template/DetailPesanan';
import Tombol from '../../components/atoms/Tombol';
import axios from 'axios';
import DetailPesananPerpanjang from './DetailPesananPerpanjang';

const Perpanjang = ({navigation}) => {
  const {data} = navigation.state.params;
  console.log(`data`, data);
  const handleLanjut = () => {
    console.log(`oke lanjut`);
    navigation.navigate('RincianPerpanjang', {data: data});
  };
  console.log(`data props`, data);
  return (
    <View style={{backgroundColor: Warna.abuAbuMuda, flex: 1}}>
      <TopBar left title="Review Pesanan" />
      <DetailPesananPerpanjang {...data} />

      <View style={{padding: 10}}>
        <Tombol onPress={handleLanjut} primary title="LANJUT" />
      </View>
    </View>
  );
};

export default withNavigation(Perpanjang);
