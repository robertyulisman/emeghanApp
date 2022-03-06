import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber, ToastDefault} from '../../utils/Fungsi';

const DetailProduct = ({navigation}) => {
  const {data} = navigation.state.params;
  const handleAddItem = () => {
    ToastDefault(`${data.title} telah ditambahkan ke keranjang`);
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Detail Produk" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1}}>
        <GambarCustom
          resizeMode="cover"
          style={{width: '100%', height: 250, borderRadius: 20}}
          source={{uri: data.gambar}}
        />
        <TextJudul style={{marginTop: 10}} title="Nama Produk" />
        <TextBody title={data.title} />
        <TextJudul style={{marginTop: 10}} title="Keterangan" />
        <TextBody title={data.desc} />
      </ScrollView>
      <View
        style={{flexDirection: 'row', marginHorizontal: 20, paddingTop: 10}}>
        <TextJudul title={`${formatNumber(data.harga)}`} />
      </View>
      <Tombol
        onPress={handleAddItem}
        style={{marginHorizontal: 20, marginBottom: 20, marginTop: 10}}
        primary
        title="Tambahkan ke keranjang"
      />
    </View>
  );
};

export default withNavigation(DetailProduct);
